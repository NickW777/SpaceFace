import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import App from './App.vue'
import mdiVue from 'mdi-vue/v3'
import * as mdijs from '@mdi/js'

const app = createApp(App)
  .use(PrimeVue)
  .use(createPinia())
  .use(mdiVue, { icons: mdijs })
  .mount('#app')