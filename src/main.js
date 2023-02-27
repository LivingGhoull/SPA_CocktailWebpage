import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/reset.css'

console.log('all is importet!')

const app = createApp(App)
console.log('1')

app.use(router)
console.log('2')

app.mount('#app')
console.log('Done')
