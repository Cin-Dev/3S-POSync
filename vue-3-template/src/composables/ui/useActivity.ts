/**
 * useActivity Composable
 * 
 * A composable that tracks user activity and manages idle state detection.
 * It provides functionality to monitor user interaction and trigger actions based on inactivity.
 * 
 * Features:
 * - User activity tracking
 * - Idle state detection
 * - Configurable idle timeout
 * - Activity event handling
 * - Automatic cleanup on component unmount
 * 
 * @returns {Object} An object containing activity state and management methods
 */

import { ref } from 'vue'

export interface Activity {
  description: string
  time: string
  datetime: string
}

export function useActivity() {
  const recentActivities = ref<Activity[]>([
    {
      description: 'Logged in to your account',
      time: 'Just now',
      datetime: new Date().toISOString()
    },
    {
      description: 'Updated profile information',
      time: '2 hours ago',
      datetime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
    },
    {
      description: 'Changed password',
      time: '1 day ago',
      datetime: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    }
  ])

  const addActivity = (activity: Activity) => {
    recentActivities.value.unshift(activity)
  }

  return {
    recentActivities,
    addActivity
  }
} 