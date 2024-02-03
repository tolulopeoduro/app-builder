import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import { createPinia } from 'pinia'
import Container from './components/Container.vue'

const app = createApp(App).use(router).use(createPinia()).mount('#app')

// eslint-disable-next-line vue/multi-word-component-names
app.component('container', Container)
