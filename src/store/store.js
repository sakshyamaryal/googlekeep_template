import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state() {
    return {
      notes: [],
      currentNote: { title: '', text: '' },
      addstate: false,
      userDetails: [],
      loginStatus: false,
      userDetails: [],
      token: '',
    }
  },
  getters: {
    getAddState(state, note) {
      return state.addstate
      // console.log(note.data);
    },

    getLoginstatus(state) {
      return state.loginStatus
    },

    getToken(state) {
      console.log(state.token, ' is token')
      return state.token
    },

    getUserDetails(state) {
      return state.userDetails
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
    },
    USER_REGISTRATION(state, userDetails) {
      state.userDetails.push(userDetails)
      console.log(userDetails.success, ' success')
      if (userDetails.success) {
        state.loginStatus = true
        state.token = userDetails.token
        console.log(userDetails.token, ' is the user token')
        // localStorage.setItem('token', userDetails.token)
      }
      console.log(state.loginStatus, ' is the user registration')
    },

    USER_LOGIN(state, userDetails) {
      state.userDetails.push(userDetails)

      if (userDetails.success) {
        state.loginStatus = true
        state.token = userDetails.token
        console.log(userDetails.token, ' is the user token from Login')
        localStorage.setItem('token', userDetails.token)
      }
      console.log(state.loginStatus, ' is the user login')
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
    },

    async addUser({ commit }, userDetails) {
      const response = await axios.post('http://localhost:8000/api/register', userDetails)
      commit('USER_REGISTRATION', response.data)
    },

    async loginUser({ commit }, userDetails) {
      const response = await axios.post('http://localhost:8000/api/login', userDetails)
      commit('USER_REGISTRATION', response.data)
    }
  }
})

export default store
