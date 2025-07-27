/**
 * useTitle Composable
 * 
 * A composable that manages the document title.
 * It provides functionality to update the page title and handle title changes.
 * 
 * Features:
 * - Dynamic title updates
 * - Title format customization
 * - Automatic cleanup
 * - Title state management
 * 
 * @returns {Object} An object containing title state and update methods
 */

import { ref, watch } from 'vue'

export function useTitle(initialTitle: string) {
  const title = ref(initialTitle)

  watch(title, (newTitle) => {
    document.title = newTitle
  }, { immediate: true })

  return {
    title,
    setTitle: (newTitle: string) => {
      title.value = newTitle
    }
  }
} 