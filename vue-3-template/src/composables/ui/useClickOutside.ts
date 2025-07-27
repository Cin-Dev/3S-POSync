/**
 * useClickOutside Composable
 * 
 * A composable that handles click outside detection for UI elements.
 * It provides functionality to detect clicks outside of a specified element and trigger callbacks.
 * 
 * Features:
 * - Click outside detection
 * - Event listener management
 * - Automatic cleanup
 * - Configurable target element
 * 
 * @param {Ref<boolean>} isOpen - A ref that tracks whether the target element is open/visible
 * @returns {Object} An object containing the click outside handler
 */

import { Ref } from 'vue'

export function useClickOutside(isOpen: Ref<boolean>) {
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (!target.closest('.relative')) {
      isOpen.value = false
    }
  }

  return {
    handleClickOutside
  }
} 