import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { useAppStore } from '@/stores/app'

// Create axios instance with default config
const api: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const appStore = useAppStore()
    appStore.setLoading(true)
    
    // Get token from localStorage
    const token = localStorage.getItem('token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
  },
  (error: AxiosError) => {
    const appStore = useAppStore()
    appStore.setLoading(false)
    console.error('Request error:', error)
    appStore.setError('Request failed')
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    const appStore = useAppStore()
    appStore.setLoading(false)
    return response
  },
  (error: AxiosError) => {
    const appStore = useAppStore()
    appStore.setLoading(false)
    console.error('Response error:', error)

    if (error.response) {
      console.error('Error response:', error.response.data)
      switch (error.response.status) {
        case 401:
          // Handle unauthorized
          appStore.setError('Unauthorized access')
          // Redirect to login if needed
          break
        case 403:
          appStore.setError('Access forbidden')
          break
        case 404:
          appStore.setError('Resource not found')
          break
        case 500:
          appStore.setError('Server error')
          break
        default:
          appStore.setError('An error occurred')
      }
    } else if (error.request) {
      console.error('No response received:', error.request)
      appStore.setError('No response from server')
    } else {
      console.error('Request setup error:', error.message)
      appStore.setError('Request failed')
    }

    return Promise.reject(error)
  }
)

export const sampleApi = {
  getMessage: async () => {
    try {
      const response = await api.get('/sample')
      return response.data
    } catch (error) {
      console.error('Sample API error:', error)
      throw error
    }
  }
}

export default api 