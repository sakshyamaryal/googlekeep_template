
// main.js or the entry file
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { createApp } from 'vue';
import store from "./store/store.js";
import App from './App.vue';
import router from './router';
import clickOutside from './store/directives/clickOutside';

const app = createApp(App);

app.directive('click-outside', clickOutside);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);
app.use(store);
app.mount('#app');
