<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 lg:p-8">
    <div class="card w-full max-w-md space-y-6 sm:space-y-8 p-4 sm:p-6 lg:p-8">
      <!-- Logo/Brand Section -->
      <div class="text-center">
        <div class="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-primary dark:text-primary-dark">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-full w-full">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h2 class="mt-4 sm:mt-6 text-center text-2xl sm:text-3xl font-extrabold text-primary-text dark:text-primary-dark-text">
          {{ appTitle }}
        </h2>
        <p class="mt-2 text-center text-sm sm:text-base text-secondary-text dark:text-secondary-dark-text">
          Sign in to your account
        </p>
      </div>

      <!-- Form Section -->
      <form class="mt-6 sm:mt-8 space-y-4 sm:space-y-6" @submit.prevent="handleLogin">
        <div class="space-y-4">
          <div>
            <label for="email-address" class="label">
              Email address
            </label>
            <div class="mt-1">
              <input
                id="email-address"
                name="email"
                type="email"
                autocomplete="email"
                required
                v-model="email"
                class="input"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label for="password" class="label">
              Password
            </label>
            <div class="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                v-model="password"
                class="input"
                placeholder="••••••••"
              />
            </div>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              v-model="rememberMe"
              class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-primary-text dark:text-primary-dark-text">
              Remember me
            </label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-primary hover:text-primary-hover dark:text-primary-dark dark:hover:text-primary-dark-hover">
              Forgot your password?
            </a>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="rounded-md bg-danger-bg dark:bg-danger-dark-bg p-3 sm:p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-danger dark:text-danger-dark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-danger-text dark:text-danger-dark-text">{{ error }}</p>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div>
          <button
            type="submit"
            :disabled="loading"
            class="btn btn-primary w-full"
          >
            {{ loading ? 'Signing in...' : 'Sign in' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTitle } from '@/composables/ui/useTitle'
import { useLogin } from '@/composables/auth/useLogin'

const appTitle = computed(() => process.env.VUE_APP_TITLE || 'SP Team Template')

useTitle(`${appTitle.value} - Login`)

const { email, password, loading, error, handleLogin } = useLogin()
const rememberMe = ref(false)
</script> 