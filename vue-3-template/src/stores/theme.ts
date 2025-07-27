import { defineStore } from 'pinia'
import { ref } from 'vue'

const THEME_KEY = 'theme-preference'

export const useThemeStore = defineStore('theme', () => {
  const isDarkMode = ref(false)
  const themeColor = ref(process.env.VUE_APP_THEME_COLOR || '#4338CA')

  function toggleTheme() {
    isDarkMode.value = !isDarkMode.value
    updateTheme()
    // Save to localStorage
    localStorage.setItem(THEME_KEY, isDarkMode.value ? 'dark' : 'light')
  }

  function updateTheme() {
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    
    // Update theme color meta tag
    updateThemeColor()
  }

  function updateThemeColor() {
    // Update theme-color meta tag
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', themeColor.value)
    }
  }

  function initializeTheme() {
    // First check localStorage
    const savedTheme = localStorage.getItem(THEME_KEY)
    
    if (savedTheme) {
      // Use saved preference
      isDarkMode.value = savedTheme === 'dark'
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      isDarkMode.value = prefersDark
      // Save initial preference
      localStorage.setItem(THEME_KEY, isDarkMode.value ? 'dark' : 'light')
    }
    
    // Apply theme
    updateTheme()

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(THEME_KEY)) {
        isDarkMode.value = e.matches
        updateTheme()
      }
    })
  }

  return {
    isDarkMode,
    themeColor,
    toggleTheme,
    updateTheme,
    initializeTheme
  }
}) 