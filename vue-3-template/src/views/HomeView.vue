<template>
  <div class="space-y-4 sm:space-y-6">
    <!-- Welcome Section -->
    <div class="card">
      <div class="card-body">
        <div class="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
          <div class="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-primary dark:bg-primary-dark flex items-center justify-center text-white text-2xl sm:text-3xl font-semibold shadow-lg transform transition-transform duration-300 hover:scale-105">
            {{ userInitials }}
          </div>
          <div class="text-center sm:text-left">
            <h1 class="text-xl sm:text-2xl font-bold text-primary-text dark:text-primary-dark-text">
              Welcome back, {{ currentUser?.name }}!
            </h1>
            <p class="text-sm sm:text-base text-secondary-text dark:text-secondary-dark-text mt-1">
              {{ currentUser?.email }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div class="card transform hover:-translate-y-1">
        <div class="card-body">
          <div class="flex items-center">
            <div class="flex-shrink-0 rounded-lg bg-primary dark:bg-primary-dark p-3 shadow-lg">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <h2 class="text-base sm:text-lg font-medium text-primary-text dark:text-primary-dark-text">Last Login</h2>
              <p class="text-sm text-secondary-text dark:text-secondary-dark-text">
                {{ new Date().toLocaleDateString() }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="card transform hover:-translate-y-1">
        <div class="card-body">
          <div class="flex items-center">
            <div class="flex-shrink-0 rounded-lg bg-success dark:bg-success-dark p-3 shadow-lg">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <h2 class="text-base sm:text-lg font-medium text-primary-text dark:text-primary-dark-text">Account Status</h2>
              <p class="text-sm text-secondary-text dark:text-secondary-dark-text">
                Active
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="card transform hover:-translate-y-1">
        <div class="card-body">
          <div class="flex items-center">
            <div class="flex-shrink-0 rounded-lg bg-info dark:bg-info-dark p-3 shadow-lg">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div class="ml-4">
              <h2 class="text-base sm:text-lg font-medium text-primary-text dark:text-primary-dark-text">Session Duration</h2>
              <p class="text-sm text-secondary-text dark:text-secondary-dark-text">
                {{ sessionDuration }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="card">
      <div class="card-header">
        <h2 class="text-base sm:text-lg font-medium text-primary-text dark:text-primary-dark-text">Recent Activity</h2>
      </div>
      <div class="card-body">
        <div class="flow-root">
          <ul role="list" class="-mb-8">
            <li v-for="(activity, index) in recentActivities" :key="index" class="transform transition-all duration-300 hover:-translate-x-1">
              <div class="relative pb-8">
                <span
                  v-if="index !== recentActivities.length - 1"
                  class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-secondary-bg dark:bg-secondary-dark-bg"
                  aria-hidden="true"
                ></span>
                <div class="relative flex space-x-3">
                  <div>
                    <span class="h-8 w-8 rounded-full bg-primary dark:bg-primary-dark flex items-center justify-center ring-8 ring-white dark:ring-gray-800 shadow-lg">
                      <svg class="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                  </div>
                  <div class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                    <div>
                      <p class="text-sm text-secondary-text dark:text-secondary-dark-text">
                        {{ activity.description }}
                      </p>
                    </div>
                    <div class="text-right text-sm whitespace-nowrap text-secondary-text dark:text-secondary-dark-text">
                      <time :datetime="activity.datetime">{{ activity.time }}</time>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTitle } from '@/composables/ui/useTitle'
import { useUser } from '@/composables/auth/useUser'
import { useSession } from '@/composables/auth/useSession'
import { useActivity } from '@/composables/ui/useActivity'

const appTitle = computed(() => process.env.VUE_APP_TITLE || 'SP Team Template')

useTitle(`${appTitle.value} - Home`)

const { userInitials, currentUser } = useUser()
const { sessionDuration } = useSession()
const { recentActivities } = useActivity()
</script> 