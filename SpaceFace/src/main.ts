import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import App from './App.vue'

const app = createApp(App).use(PrimeVue).use(createPinia()).mount('#app')