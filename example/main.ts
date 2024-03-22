/*
 * @version:
 * @Author: Hardy
 * @Date: 2024-03-21 17:39:23
 * @Description:
 */
import { createApp } from 'vue'
import App from './App.vue'
import HIcon from '@h-plus/components/icon'
import '@h-plus/theme-chalk/src/index.scss'

const app = createApp(App)

app.use(HIcon)

app.mount('#app')
