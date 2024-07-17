import { createApp } from 'vue';
import "./style/main.scss";
import "bootstrap/dist/js/bootstrap.js";
import "./axios.js";
import { router } from './router';
import App from './App.vue';

createApp(App).use(router).mount('#app');
