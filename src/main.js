
// main.js or the entry file
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { createApp } from 'vue';
import store from "./store/store.js";
// import authStore from "./store/authstore.js";

import App from './App.vue';
import router from './router';
import clickOutside from './store/directives/clickOutside';
import LaravelPermissionToVueJS from 'laravel-permission-to-vuejs'
import ToastPlugin from 'vue-toast-notification';
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-bootstrap.css';

const app = createApp(App);

app.directive('click-outside', clickOutside);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);
app.use(LaravelPermissionToVueJS)
app.use(store);
app.use(ToastPlugin);
  
app.mount('#app');