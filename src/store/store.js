import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state() {
    return {
      notes: [],
      currentNote: { title: '', text: '' },
      addstate: false
    }
  },
  getters: {
    getAddState(state, note) {
      return state.addstate
      // console.log(note.data);
    }
  },
  mutations: {
    SET_NOTES(state, notes) {
      state.notes = notes
    },
    ADD_NOTE(state, note) {
      state.notes.push(note)
      if (note.success) {
        state.addstate = true
      }
    },
    UPDATE_NOTE(state, updatedNote) {
      const index = state.notes.findIndex((note) => note.id === updatedNote.id)
      if (index !== -1) {
        state.notes.splice(index, 1, updatedNote)
      }
    },
    DELETE_NOTE(state, id) {
      state.notes = state.notes.filter((note) => note.id !== id)
    },
    CLEAR_CURRENT_NOTE(state) {
      state.currentNote = { title: '', text: '' }
    }
  },
  actions: {
    async fetchNotes({ commit }) {
      const response = await axios.get('http://localhost:8000/api/notes')
      commit('SET_NOTES', response.data)
    },
    async addNote({ commit }, note) {
      const response = await axios.post('http://localhost:8000/api/notes', note)
      commit('ADD_NOTE', response.data)
      if (response.data.success) {
        commit('CLEAR_CURRENT_NOTE')
      }
    },
    async updateNote({ commit }, note) {
      const response = await axios.put(`http://localhost:8000/api/notes/${note.id}`, note)
      commit('UPDATE_NOTE', response.data)
    },
    async deleteNote({ commit }, id) {
      await axios.delete(`http://localhost:8000/api/notes/${id}`)
      commit('DELETE_NOTE', id)
    }
  }
})

export default store
