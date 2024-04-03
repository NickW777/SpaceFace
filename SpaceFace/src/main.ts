import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'; // here


import App from './App.vue'
import router from './router'

const app = createApp(App).use(PrimeVue)

app.use(createPinia())
app.use(router)

app.mount('#app')
