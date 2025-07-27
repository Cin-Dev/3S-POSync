/**
 * useUser Composable
 * 
 * A composable that provides user-related functionality and state management.
 * It handles user data access, authentication state, and user initials generation.
 * 
 * Features:
 * - Current user data access
 * - Authentication state checking
 * - User initials generation from name
 * 
 * @returns {Object} An object containing user data, auth state, and user initials
 */

import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

export function useUser() {
  const authStore = useAuthStore()

  const userInitials = computed(() => {
    const name = authStore.currentUser?.name || ''
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  })

  const currentUser = computed(() => authStore.currentUser)
  const isAuthenticated = computed(() => authStore.isAuthenticated)

  return {
    userInitials,
    currentUser,
    isAuthenticated
  }
} 