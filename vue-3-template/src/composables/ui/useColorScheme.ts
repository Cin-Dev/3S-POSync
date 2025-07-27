/**
 * useColorScheme Composable
 * 
 * A composable that manages color scheme preferences and system theme detection.
 * It provides functionality to handle light/dark mode preferences and system theme changes.
 * 
 * Features:
 * - Color scheme preference management
 * - System theme detection
 * - Theme persistence in localStorage
 * - Automatic theme synchronization
 * - Theme change event handling
 * 
 * @returns {Object} An object containing color scheme state and management methods
 */

import { onMounted, watch } from 'vue'
import { colors, generateColorVariables } from '@/config/colors'
import { useThemeStore } from '@/stores/theme'

export function useColorScheme() {
  const themeStore = useThemeStore()

  const applyColorScheme = () => {
    const root = document.documentElement
    const variables = generateColorVariables()
    
    // Apply all color variables to the root element
    Object.entries(variables).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })
  }

  // Apply color scheme on mount
  onMounted(() => {
    // Theme is already initialized in main.ts
    applyColorScheme()
  })

  // Watch for dark mode changes
  watch(
    () => themeStore.isDarkMode,
    () => {
      applyColorScheme()
    }
  )

  return {
    colors,
    applyColorScheme
  }
} 