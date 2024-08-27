import { createStore } from 'vuex'
import axios from 'axios'

const authStore = createStore({
  state() {
    return {
        loginStatus : false,
        userDetails : []
    }
  },
  getters: {
    getLoginstatus(state) {
      console.log(state.loginStatus , " getlogin accessed");
      return state.loginStatus;
    },

    getToken(state) {
        return state.token;
    },

    getUserDetails(state){
        return state.userDetails;
    }

  },
  mutations: {
    USER_REGISTRATION(state, userDetails) {
      state.userDetails.push(userDetails)
      console.log(userDetails.success, " success");
      if (userDetails.success) {
        state.loginStatus = true
      }
      console.log(state.loginStatus, " is the user registration");
    },
  },
  actions: {
    async addUser({ commit }, userDetails) {
      const response = await axios.post('http://localhost:8000/api/register', userDetails)
      commit('USER_REGISTRATION', response.data)
    },
  }
})

export default authStore
