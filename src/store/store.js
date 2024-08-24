import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state() {
    return {
      notes: []
    };
  },
  mutations: {
    SET_NOTES(state, notes) {
      state.notes = notes;
    },
    ADD_NOTE(state, note) {
      state.notes.push(note);
    },
    UPDATE_NOTE(state, updatedNote) {
      const index = state.notes.findIndex(note => note.id === updatedNote.id);
      if (index !== -1) {
        state.notes.splice(index, 1, updatedNote);
      }
    },
    DELETE_NOTE(state, id) {
      state.notes = state.notes.filter(note => note.id !== id);
    }
  },
  actions: {
    async fetchNotes({ commit }) {
      const response = await axios.get('http://localhost:8000/api/notes');
      commit('SET_NOTES', response.data);
    },
    async addNote({ commit }, note) {
      const response = await axios.post('http://localhost:8000/api/notes', note);
      commit('ADD_NOTE', response.data);
    },
    async updateNote({ commit }, note) {
      const response = await axios.put(`http://localhost:8000/api/notes/${note.id}`, note);
      commit('UPDATE_NOTE', response.data);
    },
    async deleteNote({ commit }, id) {
      await axios.delete(`http://localhost:8000/api/notes/${id}`);
      commit('DELETE_NOTE', id);
    }
  }
});

export default store;
