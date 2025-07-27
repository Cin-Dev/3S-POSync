import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAppStore = defineStore('app', () => {
  // State
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const theme = ref<'light' | 'dark'>(localStorage.getItem('theme') as 'light' | 'dark' || 'light')

  // Getters
  const isDark = computed(() => theme.value === 'dark')

  // Actions
  function setLoading(loading: boolean) {
    isLoading.value = loading
  }

  function setError(err: string | null) {
    error.value = err
  }

  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', theme.value)
    document.documentElement.classList.toggle('dark', theme.value === 'dark')
  }

  return {
    // State
    isLoading,
    error,
    theme,
    // Getters
    isDark,
    // Actions
    setLoading,
    setError,
    toggleTheme
  }
}) 