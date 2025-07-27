/**
 * useSession Composable
 * 
 * A composable that manages user session state and persistence.
 * It handles session initialization, token management, and session cleanup.
 * 
 * Features:
 * - Session initialization and validation
 * - Token management (storage and retrieval)
 * - Session cleanup on logout
 * - Automatic session restoration on page load
 * 
 * @returns {Object} An object containing session state and management methods
 */

import { ref, onMounted, onUnmounted } from 'vue'

export function useSession() {
  const sessionStartTime = ref(new Date())
  const sessionDuration = ref('0 minutes')

  let durationInterval: number

  onMounted(() => {
    durationInterval = window.setInterval(() => {
      const now = new Date()
      const diff = now.getTime() - sessionStartTime.value.getTime()
      const minutes = Math.floor(diff / 1000 / 60)
      sessionDuration.value = `${minutes} minutes`
    }, 60000) // Update every minute
  })

  onUnmounted(() => {
    if (durationInterval) {
      clearInterval(durationInterval)
    }
  })

  return {
    sessionDuration,
    sessionStartTime
  }
} 