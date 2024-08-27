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
  logout as performLogout
} from './components/auth/Authenticate'

export default {
  name: 'app',
  setup() {
    const authStatusRef = ref(isAuthenticated())

    const logout_user = () => {
      performLogout()
      this.$router.push('/login')
    }

    watch(authStatus, (newStatus) => {
      authStatusRef.value = newStatus
    })

    return {
      authStatus: authStatusRef,
      logout_user
    }
  }
}
</script>
