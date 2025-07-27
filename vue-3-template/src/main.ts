import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useThemeStore } from '@/stores/theme'
import { registerServiceWorker } from './utils/serviceWorker'
import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Initialize theme before mounting
const themeStore = useThemeStore()
themeStore.initializeTheme()

app.mount('#app')

// Only register service worker in production
if (process.env.NODE_ENV === 'production') {
  registerServiceWorker()
} 