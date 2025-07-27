/* eslint-disable */
<template>
  <div class="space-y-4 sm:space-y-6">
    <!-- User Profile Section -->
    <div class="card">
      <div class="card-header">
        <h2 class="text-base sm:text-lg font-medium text-primary-text dark:text-primary-dark-text">User Profile</h2>
      </div>
      <div class="card-body">
        <div class="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
          <div class="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-primary dark:bg-primary-dark flex items-center justify-center text-white text-2xl sm:text-3xl font-semibold shadow-lg transform transition-transform duration-300 hover:scale-105">
            {{ userInitials }}
          </div>
          <div class="text-center sm:text-left">
            <h3 class="text-lg sm:text-xl font-semibold text-primary-text dark:text-primary-dark-text">
              {{ currentUser?.name }}
            </h3>
            <p class="text-sm sm:text-base text-secondary-text dark:text-secondary-dark-text">
              {{ currentUser?.email }}
            </p>
            <div class="mt-2">
              <span class="badge badge-success">
                Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Account Information -->
    <div class="card">
      <div class="card-header">
        <h2 class="text-base sm:text-lg font-medium text-primary-text dark:text-primary-dark-text">Account Information</h2>
      </div>
      <div class="card-body">
        <dl class="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
          <div class="transform transition-all duration-300 hover:-translate-y-1">
            <dt class="text-sm font-medium text-secondary-text dark:text-secondary-dark-text">Name</dt>
            <dd class="mt-1 text-sm sm:text-base text-primary-text dark:text-primary-dark-text">{{ currentUser?.name }}</dd>
          </div>
          <div class="transform transition-all duration-300 hover:-translate-y-1">
            <dt class="text-sm font-medium text-secondary-text dark:text-secondary-dark-text">Email</dt>
            <dd class="mt-1 text-sm sm:text-base text-primary-text dark:text-primary-dark-text">{{ currentUser?.email }}</dd>
          </div>
          <div class="transform transition-all duration-300 hover:-translate-y-1">
            <dt class="text-sm font-medium text-secondary-text dark:text-secondary-dark-text">Role</dt>
            <dd class="mt-1 text-sm sm:text-base text-primary-text dark:text-primary-dark-text">{{ currentUser?.role || 'User' }}</dd>
          </div>
          <div class="transform transition-all duration-300 hover:-translate-y-1">
            <dt class="text-sm font-medium text-secondary-text dark:text-secondary-dark-text">Account Status</dt>
            <dd class="mt-1">
              <span class="badge badge-success">
                Active
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </div>

    <!-- Security Information -->
    <div class="card">
      <div class="card-header">
        <h2 class="text-base sm:text-lg font-medium text-primary-text dark:text-primary-dark-text">Security Information</h2>
      </div>
      <div class="card-body">
        <div class="space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 transform transition-all duration-300 hover:-translate-y-1">
            <div>
              <h3 class="text-sm sm:text-base font-medium text-primary-text dark:text-primary-dark-text">Two-Factor Authentication</h3>
              <p class="text-sm text-secondary-text dark:text-secondary-dark-text">Add an extra layer of security to your account</p>
            </div>
            <button
              type="button"
              class="btn btn-primary btn-sm"
            >
              Enable
            </button>
          </div>
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 transform transition-all duration-300 hover:-translate-y-1">
            <div>
              <h3 class="text-sm sm:text-base font-medium text-primary-text dark:text-primary-dark-text">Password</h3>
              <p class="text-sm text-secondary-text dark:text-secondary-dark-text">Last changed 30 days ago</p>
            </div>
            <button
              type="button"
              class="btn btn-primary btn-sm"
            >
              Change
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- About the Application -->
    <div class="card">
      <div class="card-header">
        <h2 class="text-base sm:text-lg font-medium text-primary-text dark:text-primary-dark-text">About the Application</h2>
      </div>
      <div class="card-body">
        <div class="prose dark:prose-invert max-w-none">
          <p class="text-sm sm:text-base text-secondary-text dark:text-secondary-dark-text">
            This is a Vue.js application built with modern best practices and a clean architecture.
            It demonstrates the use of:
          </p>
          <ul class="mt-4 space-y-2">
            <li class="flex items-center space-x-2 text-sm sm:text-base text-secondary-text dark:text-secondary-dark-text">
              <svg class="h-5 w-5 text-primary dark:text-primary-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Vue 3 with Composition API</span>
            </li>
            <li class="flex items-center space-x-2 text-sm sm:text-base text-secondary-text dark:text-secondary-dark-text">
              <svg class="h-5 w-5 text-primary dark:text-primary-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>TypeScript for type safety</span>
            </li>
            <li class="flex items-center space-x-2 text-sm sm:text-base text-secondary-text dark:text-secondary-dark-text">
              <svg class="h-5 w-5 text-primary dark:text-primary-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Pinia for state management</span>
            </li>
            <li class="flex items-center space-x-2 text-sm sm:text-base text-secondary-text dark:text-secondary-dark-text">
              <svg class="h-5 w-5 text-primary dark:text-primary-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Vue Router for navigation</span>
            </li>
            <li class="flex items-center space-x-2 text-sm sm:text-base text-secondary-text dark:text-secondary-dark-text">
              <svg class="h-5 w-5 text-primary dark:text-primary-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Tailwind CSS for styling</span>
            </li>
            <li class="flex items-center space-x-2 text-sm sm:text-base text-secondary-text dark:text-secondary-dark-text">
              <svg class="h-5 w-5 text-primary dark:text-primary-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Composables for reusable logic</span>
            </li>
          </ul>
          <p class="mt-4 text-sm sm:text-base text-secondary-text dark:text-secondary-dark-text">
            The application follows a modular structure with clear separation of concerns,
            making it easy to maintain and scale.
          </p>
        </div>
      </div>
    </div>

    <!-- Laravel API Response -->
    <div class="card">
      <div class="card-header">
        <h2 class="text-base sm:text-lg font-medium text-primary-text dark:text-primary-dark-text">Backend Connection</h2>
      </div>
      <div class="card-body">
        <div class="prose dark:prose-invert max-w-none">
          <div v-if="loading" class="flex items-center justify-center py-4">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary dark:border-primary-dark"></div>
          </div>
          <div v-else-if="error" class="text-red-500 dark:text-red-400">
            {{ error }}
          </div>
          <div v-else class="text-sm sm:text-base text-secondary-text dark:text-secondary-dark-text">
            <p>Message from Laravel API:</p>
            <div class="mt-2 text-green-00 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              {{ apiMessage }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useTitle } from '@/composables/ui/useTitle'
import { useUser } from '@/composables/auth/useUser'
import { sampleApi } from '@/services/api'

const appTitle = computed(() => process.env.VUE_APP_TITLE || 'SP Team Template')

useTitle(`${appTitle.value} - About`)

const { userInitials, currentUser } = useUser()

// API Response State
const apiMessage = ref('')
const loading = ref(true)
const error = ref('')

// Fetch API Response - this is a test to see if the API is working
const fetchApiMessage = async () => {
  try {
    loading.value = true
    error.value = ''
    const response = await sampleApi.getMessage()
    apiMessage.value = response.message
  } catch (err) {
    error.value = 'Failed to fetch message from Laravel API'
    console.error('API Error:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchApiMessage()
})
</script> 