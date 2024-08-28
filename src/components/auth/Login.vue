<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card mt-5">
          <div class="card-header text-center">
            <h2>Login</h2>
          </div>
          <div class="card-body">
            <form @submit.prevent="login">
              <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="Enter email"
                  name="email"
                  v-model="user.email"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="Enter password"
                  name="password"
                  v-model="user.password"
                  required
                />
              </div>
              <div class="d-grid">
                <button type="submit" class="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
          <div class="card-footer text-center">
            <small>Sign-Up Here!<router-link to="/signup">Sign Up</router-link></small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SET_USERROLE } from '../../store/storeConstants'
// import axios from 'axios'
import { mapActions } from 'vuex'
import { login as performLogIn, addUserRole, addUserID } from './Authenticate'

export default {
  name: 'login',
  data() {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    // async login() {
    //   var data = {
    //     email: this.user.email,
    //     password: this.user.password
    //   }

    //   await axios
    //     .post('http://localhost:8000/api/login', data)
    //     .then((response) => {
    //       console.log(response.data.token)
    //       sessionStorage.setItem('token', response.data.token)
    //       // localStorage.setItem('token',token);
    //       performLogIn(response.data.token)

    //     })
    //     .catch((errorMessages) => {
    //       console.log(errorMessages)
    //     })
    // }
    ...mapActions(['loginUser']),

    async login() {
      var data = {
        email: this.user.email,
        password: this.user.password
      }

      await this.loginUser(data)

      if (this.$store.getters.getLoginstatus) {
        // console.log(this.$route.path('/home'));
        // return this.$route.path('/home')
        console.log(this.$store.getters.getRole, " is the role");
        performLogIn(this.$store.getters.getToken)
        addUserRole(this.$store.getters.getRole)
        this.$store.commit(`${SET_USERROLE}`);

        // if (this.$store.getters.getCurrentUserId) {
        //   addUserID(this.$store.getters.getCurrentUserId) 
        // }

        return this.$router.push({ path: '/home' })
      }
    }
  }
}
</script>
