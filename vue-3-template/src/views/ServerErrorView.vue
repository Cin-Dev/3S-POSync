<template>
  <div class="min-h-screen flex items-center justify-center bg-primary-bg dark:bg-primary-dark-bg py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl w-full">
      <!-- Main Content Card -->
      <div class="card bg-white dark:bg-gray-800 shadow-xl">
        <div class="card-body p-8 sm:p-12">
          <!-- 500 Illustration -->
          <div class="relative mb-8">
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-48 h-48 rounded-full bg-danger dark:bg-danger-dark bg-opacity-10 dark:bg-opacity-10 animate-pulse"></div>
            </div>
            <div class="relative text-center">
              <h1 class="text-9xl font-extrabold text-danger dark:text-danger-dark opacity-20">500</h1>
              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg class="w-24 h-24 text-danger dark:text-danger-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Error Message -->
          <div class="text-center space-y-4">
            <h2 class="text-3xl font-bold text-primary-text dark:text-primary-dark-text">
              Oops! Server Error
            </h2>
            <p class="text-lg text-secondary-text dark:text-secondary-dark-text max-w-md mx-auto">
              Something went wrong on our end. We're working to fix the issue. Please try again later.
            </p>
          </div>

          <!-- Action Buttons -->
          <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <router-link
              to="/"
              class="btn btn-primary w-full sm:w-auto group flex items-center justify-center space-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 transition-transform group-hover:scale-110"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              <span>Return to Home</span>
            </router-link>
            <button
              @click="refreshPage"
              class="btn btn-info w-full sm:w-auto group flex items-center justify-center space-x-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 transition-transform group-hover:scale-110" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
              </svg>
              <span>Refresh Page</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTitle } from '@/composables/ui/useTitle'
import { useColorScheme } from '@/composables/ui/useColorScheme'
import { onMounted, computed } from 'vue'

const appTitle = computed(() => process.env.VUE_APP_TITLE || 'SP Team Template')

useTitle(`${appTitle.value} - Server Error`)

const { applyColorScheme } = useColorScheme()

// Apply color scheme on mount
onMounted(() => {
  applyColorScheme()
})

function refreshPage() {
  window.location.reload()
}
</script>

<style scoped>
.animate-pulse {
  animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 0.2;
    transform: scale(1.05);
  }
}

/* Smooth transitions for all interactive elements */
.btn {
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-1px);
}

.btn:active {
  transform: translateY(1px);
}

/* Ensure proper spacing in buttons */
.btn > * {
  display: inline-flex;
  align-items: center;
}
</style> 