/* eslint-disable */
<template>
 <h1>In my free time, I create my peace.</h1>
 <button style="padding: 10px; background: skyblue; border-radius: 10px;">Hobbies</button>
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