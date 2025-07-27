<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <!-- Sidebar -->
    <Sidebar v-model:isOpen="isSidebarOpen" />
    
    <div class="lg:pl-64">
      <!-- Header -->
      <header class="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white dark:bg-gray-800 shadow">
        <!-- Mobile Menu Button -->
        <button
          type="button"
          class="px-4 text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
          @click="toggleSidebar"
        >
          <span class="sr-only">Open sidebar</span>
          <svg
            class="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <!-- Header Content -->
        <div class="flex flex-1 justify-between px-4">
          <div class="flex flex-1">
            <!-- Add your header content here -->
          </div>
          <!-- User Profile Section -->
          <div class="ml-auto flex items-center md:ml-6">
            <div class="relative ml-3">
              <!-- Profile Button -->
              <div>
                <button
                  type="button"
                  class="flex max-w-xs items-center rounded-full bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  @click="toggleProfile"
                >
                  <span class="sr-only">Open user menu</span>
                  <div class="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                    {{ userInitials }}
                  </div>
                </button>
              </div>
              
              <!-- Profile Dropdown Menu -->
              <div
                v-if="isProfileOpen"
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
              >
                <!-- User Info -->
                <div class="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
                  <p class="font-medium truncate" :title="currentUser?.name">{{ currentUser?.name }}</p>
                  <p class="text-gray-500 dark:text-gray-400 truncate" :title="currentUser?.email">{{ currentUser?.email }}</p>
                </div>
                <div class="border-t border-gray-100 dark:border-gray-700"></div>
                
                <!-- Theme Toggle -->
                <button
                  type="button"
                  class="block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700"
                  @click="toggleTheme"
                >
                  <div class="flex items-center">
                    <span class="mr-3 text-lg flex-shrink-0">{{ isDarkMode ? '🌞' : '🌙' }}</span>
                    <span class="truncate">{{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}</span>
                  </div>
                </button>

                <!-- Logout Button -->
                <button
                  type="button"
                  class="block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  @click="handleLogout"
                  :disabled="isLoading"
                >
                  <div class="flex items-center">
                    <svg
                      class="mr-3 h-5 w-5 text-gray-400 flex-shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v3a1 1 0 102 0V9z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="truncate">{{ isLoading ? 'Logging out...' : 'Sign out' }}</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="py-6">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
// Imports
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useThemeStore } from '@/stores/theme'
import { useClickOutside } from '@/composables/ui/useClickOutside'
import { useUser } from '@/composables/auth/useUser'
import { useLogin } from '@/composables/auth/useLogin'
import Sidebar from './Sidebar.vue'

// Store Instances
const authStore = useAuthStore()
const themeStore = useThemeStore()
const { userInitials } = useUser()
const { handleLogout } = useLogin()

// State
const isProfileOpen = ref(false)
const isSidebarOpen = ref(false)

// Computed Properties
const currentUser = computed(() => authStore.currentUser)
const isLoading = computed(() => authStore.isLoading)
const isDarkMode = computed(() => themeStore.isDarkMode)

// Methods
const toggleProfile = () => {
  isProfileOpen.value = !isProfileOpen.value
}

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const toggleTheme = () => {
  themeStore.toggleTheme()
}

// Lifecycle Hooks
const { handleClickOutside } = useClickOutside(isProfileOpen)

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script> 