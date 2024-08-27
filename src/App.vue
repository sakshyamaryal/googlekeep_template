<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <div class="navbar-nav mr-auto">
        <li class="nav-item pull-right">
          <router-link to="/home" class="nav-link">Home</router-link>
        </li>
      </div>
      <div class="navbar-nav">
        <li class="nav-item pull-right" v-if="!authStatus">
          <router-link to="/login" class="nav-link">Login</router-link>
        </li>
        <li class="nav-item pull-right" v-if="authrole === 'admin'">
          <router-link to="/users" class="nav-link">users</router-link>
        </li>
        <li class="nav-item pull-right" v-if="!authStatus">
          <router-link to="/signup" class="nav-link">Sign Up</router-link>
        </li>
        <li class="nav-item pull-right" v-if="authStatus">
          <a href="#" @click="logout_user" class="nav-link">Logout</a>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import {
  isAuthenticated,
  authStatus,
  logout as performLogout,
  userrole,
  role,
  addUserRole
} from './components/auth/Authenticate'
import { GET_USERROLE } from './store/storeConstants'

export default {
  name: 'app',
  setup() {
    const authStatusRef = ref(isAuthenticated())
    const authrole = ref(userrole())

    console.log(role.value, ' is the user role')
    const logout_user = () => {
      performLogout()
      addUserRole('')
      localStorage.setItem('userid', 0)
      this.$router.push('/login')
    }

    watch(authStatus, (newStatus) => {
      authStatusRef.value = newStatus
    })

    watch(role, (newRole) => {
      authrole.value = newRole
    })

    return {
      authStatus: authStatusRef,
      logout_user,
      authrole
    }
  },
  data() {
    return {
      roleName: ''
    }
  },
  methods: {
    getUserRole() {
      return this.$store.getters[`${GET_USERROLE}`]
    }
  },
  mounted() {
    console.log(this.authrole, ' is user role')
  }
}
</script>
