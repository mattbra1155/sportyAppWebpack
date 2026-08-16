import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import { watchNetworkStatus } from './networkStatus'

watchNetworkStatus()

createApp(App).use(store).use(router).use(ElementPlus).mount('#app')
