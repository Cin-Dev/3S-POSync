/**
 * useLogin Composable
 * 
 * A composable that handles user authentication functionality including login and logout.
 * It manages the login form state, handles form submission, and provides error handling.
 * 
 * Features:
 * - Form state management (email, password)
 * - Login form submission with validation
 * - Error handling and loading states
 * - Logout functionality
 * - Automatic redirection after successful login
 * 
 * @returns {Object} An object containing form state, loading state, error state, and auth methods
 */

import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export function useLogin() {
  const router = useRouter()
  const route = useRoute()
  const authStore = useAuthStore()

  const email = ref('')
  const password = ref('')
  const loading = ref(false)
  const error = ref('')

  const handleLogin = async () => {
    try {
      loading.value = true
      error.value = ''

      // Validate input
      if (!email.value || !password.value) {
        throw new Error('Please enter both email and password')
      }

      // TODO: Replace mock login with actual authentication when ready
      // Original authentication code (commented out for future reference):
      /*
      await authStore.login({
        email: email.value,
        password: password.value
      })
      */

      // Mock successful login
      const mockUser = {
        id: 1,
        email: email.value,
        name: email.value.split('@')[0] // Use part before @ as name
      }

      // Set mock user in store
      authStore.user = mockUser
      authStore.token = 'mock-token'
      localStorage.setItem('token', 'mock-token')
      localStorage.setItem('mock-email', email.value) // Store email for checkAuth
      
      // Redirect to the original destination or home
      const redirectPath = route.query.redirect as string || '/'
      await router.push(redirectPath)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred during login'
    } finally {
      loading.value = false
    }
  }

  const handleLogout = async () => {
    try {
      await authStore.logout()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return {
    email,
    password,
    loading,
    error,
    handleLogin,
    handleLogout
  }
} 