import { createApp } from 'vue'
import './style/style.css'
import App from './App.vue'
import { usePlugins } from "./plugins";

const app = createApp(App);
usePlugins(app);
app.mount('#app')
