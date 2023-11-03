import { createApp } from 'vue'
import App from './App.vue'
import axios from "axios";
axios.defaults.baseURL = '/proxy_url';

createApp(App).mount('#app')
