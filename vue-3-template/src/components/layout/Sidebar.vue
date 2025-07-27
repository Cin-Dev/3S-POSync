<template>
  <aside
    class="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-xl transform transition-all duration-300 ease-in-out lg:translate-x-0"
    :class="{ '-translate-x-full': !isOpen, 'translate-x-0': isOpen }"
  >
    <div class="flex flex-col h-full">
      <!-- Logo Section -->
      <div class="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-primary-bg to-primary-bg/80 dark:from-primary-dark-bg dark:to-primary-dark-bg/80">
        <div class="flex items-center justify-center space-x-2 px-2 w-full">
          <div class="h-8 w-8 flex items-center justify-center flex-shrink-0">
            <img src="@/assets/sample-logo.png" alt="Logo" class="h-5 w-5" />
          </div>
          <h1 class="text-base sm:text-lg lg:text-xl font-bold bg-gradient-to-r from-primary-text to-primary-text/80 dark:from-primary-dark-text dark:to-primary-dark-text/80 bg-clip-text text-transparent break-words text-center">
            {{ appTitle }}
          </h1>
        </div>
      </div>

      <!-- Navigation Section -->
      <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <router-link
          v-for="item in navigation"
          :key="item.to"
          :to="item.to"
          class="group flex items-center px-3 py-2.5 text-secondary-text dark:text-secondary-dark-text rounded-lg transition-all duration-200 relative overflow-hidden"
          :class="{
            'bg-gradient-to-r from-primary-bg to-primary-bg/10 dark:from-primary-dark/20 dark:to-primary-dark/50 text-primary dark:text-primary-dark': isActive(item.to),
            'hover:bg-secondary-bg dark:hover:bg-secondary-dark-bg': !isActive(item.to)
          }"
        >
          <!-- Active Indicator -->
          <div
            v-if="isActive(item.to)"
            class="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-primary-hover dark:from-primary-dark dark:to-primary-dark-hover rounded-r-full"
          ></div>

          <!-- Navigation Item Content -->
          <div class="flex items-center space-x-3 relative z-10">
            <div
              class="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200"
              :class="{
                'bg-primary-bg/20 dark:bg-primary-dark/20': isActive(item.to),
                'bg-secondary-bg/50 dark:bg-secondary-dark-bg/50': !isActive(item.to)
              }"
            >
              <component 
                :is="item.icon" 
                :class="[
                  'w-5 h-5 flex-shrink-0 transition-all duration-200 group-hover:scale-110',
                  isActive(item.to) 
                    ? 'text-primary dark:text-primary-dark' 
                    : 'text-secondary-text/70 dark:text-secondary-dark-text/70 group-hover:text-primary/80 dark:group-hover:text-primary-dark/80'
                ]"
              />
            </div>
            <span class="text-sm font-medium truncate">{{ item.name }}</span>
          </div>

          <!-- Hover Effect -->
          <div
            class="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 dark:from-primary-dark/5 dark:via-primary-dark/10 dark:to-primary-dark/5 transition-all duration-300"
            :class="{ 'opacity-0': isActive(item.to) }"
          ></div>
        </router-link>
      </nav>

      <!-- Footer Section -->
      <div class="p-4 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-center space-x-2 text-xs text-secondary-text dark:text-secondary-dark-text">
          <span>© {{ new Date().getFullYear() }}</span>
          <span class="w-1 h-1 rounded-full bg-secondary-bg dark:bg-secondary-dark-bg"></span>
          <span>Developed by Proweaver</span>
        </div>
      </div>
    </div>
  </aside>

  <!-- Mobile Overlay -->
  <div
    v-if="isOpen"
    class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity duration-300"
    @click="toggleSidebar"
  ></div>
</template>

<script setup lang="ts">
// Imports
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getNavigationItems } from '@/router'

// Props & Emits
const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'update:isOpen', value: boolean): void
}>()

// Composables
const route = useRoute()
const router = useRouter()

// Computed Properties
const appTitle = computed(() => process.env.VUE_APP_TITLE || 'SP Team Template')
const navigation = computed(() => getNavigationItems(router.options.routes))

// Methods
const isActive = (path: string) => route.path === path
const toggleSidebar = () => emit('update:isOpen', !props.isOpen)
</script> 