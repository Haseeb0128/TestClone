import { createApp } from 'vue'
import App from './App.vue'
// import vue from 'vue'
import router from './router'
import vuetify from './plugins/vuetify'
// import { dateFns } from '@date-fns'
import { format } from 'date-fns'
import { loadFonts } from './plugins/webfontloader'
import store from './store.js'
// import '../src/assets/main.css'
loadFonts()
const app = createApp(App)
app.config.globalProperties.$dateFns = { format } // Add format to globalProperties
// app.config.globalProperties.$unique = { UniqueId }
app.use(router).use(store).use(vuetify).mount('#app')

// import { createApp } from 'vue'
// import App from './App.vue'
// import { format } from 'date-fns'

// const app = createApp(App)

// app.config.globalProperties.$dateFns = { format } // Add format to globalProperties

// app.mount('#app')
