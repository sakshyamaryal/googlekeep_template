import { createStore } from 'vuex'
import axios from 'axios'
import {
  SET_USERROLE,GET_USERROLE
} from "./storeConstants";

const store = createStore({
  state() {
    return {
      notes: [],
      currentNote: { title: '', text: '' },
      addstate: false,
      userDetails: [],
      loginStatus: false,
      token: '',
      userRole: '',
      userid: 0
    }
  },
  getters: {
    getAddState(state, note) {
      return state.addstate
      // console.log(note.data);
    },

    getNotes(state) {
      return state.notes
    },

    getLoginstatus(state) {
      return state.loginStatus
    },

    getCurrentUserDetail(state) {
      return state.userDetails
    },

    getRole(state) {
      return state.userRole
    },

    getToken(state) {
      // console.log(state.token, ' is token')
      return state.token
    },

    getCurrentUserId(state) {
      return state.userid
    },

    getUserDetails(state) {
      return state.userDetails
    },
    [GET_USERROLE](state) {
        return state.userRole;
    }
  },
  mutations: {
    SET_NOTES(state, notes) {
      state.notes = notes
    },
    ADD_NOTE(state, note) {
      state.notes.push(note)
      // console.log(note, ' while adding note')
      if (note) {
        state.addstate = true
      }
    },
    UPDATE_NOTE(state, updatedNote) {
      const index = state.notes.findIndex((note) => note.id === updatedNote.id)
      // console.log(updatedNote, ' is the Note Updates')
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
      if (userDetails.success) {
        state.loginStatus = true
        state.token = userDetails.token
        localStorage.setItem('token', userDetails.token)
        state.userRole = userDetails.userRoleAndPermission[0].userrole
        state.userid = userDetails.user.id
        localStorage.setItem('userid',userDetails.user.id);
        
      }
    },
    [SET_USERROLE](state, role) {
        state.userRole = role
    },
    USER_LOGIN(state, userDetails) {
      state.userDetails.push(userDetails)
      if (userDetails.success) {
        state.loginStatus = true
        state.token = userDetails.token
        localStorage.setItem('token', userDetails.token)
        state.userRole = userDetails.userRoleAndPermission[0].userrole
        state.userid = userDetails.user.id
        localStorage.setItem('userid',userDetails.user.id);
      }
      // console.log(state.loginStatus, ' is the user login')
    }
  },
  actions: {
    async fetchNotes({ commit }, userid) {
      console.log(userid)
      const response = await axios.get(`http://localhost:8000/api/notes/${userid}`, userid)
      commit('SET_NOTES', response.data.data)
    },

    async addNote({ commit }, note) {
      const response = await axios.post('http://localhost:8000/api/notes', note)
      commit('ADD_NOTE', response.data.data)
      if (response.data.success) {
        commit('CLEAR_CURRENT_NOTE')
      }
    },

    async updateNote({ commit }, note) {
      const response = await axios.put(`http://localhost:8000/api/notes/${note.id}`, note)
      commit('UPDATE_NOTE', response.data.data)
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
      commit('USER_LOGIN', response.data)
    }
  }
})

export default store
