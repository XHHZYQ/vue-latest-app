
import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import i18nPlugin from './utils/myPlugin.js'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)

app.use(i18nPlugin, {
  greetings: {
    hello: 'Bonjour!'
  }
})


app.mount('#app')
