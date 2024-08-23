<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/home" class="navbar-brand">Home</router-link>
      <div class="navbar-nav mr-auto">
        <!-- <li class="nav-item pull-right" >
          <router-link to="/userlist" class="nav-link">Users</router-link>
        </li> -->
      </div>
      <div class="navbar-nav">
        <li class="nav-item pull-right">
          <router-link to="/login" class="nav-link">Login</router-link>
        </li>
        <!-- <li class="nav-item pull-right" >
          <router-link to="/signup" class="nav-link">Sign Up</router-link>
        </li>
        <li class="nav-item pull-right" >
          <a href="#"  class="nav-link">Logout</a>
        </li> -->
      </div>
    </nav>

    <div class="container mt-3">
      <RouterView />
      <!-- HelloWorld -->
    </div>
  </div>
</template>

<style scoped></style>
