import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AppLayout from '@/components/layout/AppLayout.vue'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import LoginView from '@/views/LoginView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import HomeIcon from '@/components/icons/HomeIcon.vue'
import AboutIcon from '@/components/icons/AboutIcon.vue'
import MyProfileView from '@/views/MyProfileView.vue'
import MyHobbiesView from '@/views/MyHobbiesView.vue'
import MyHobbiesIcon from '@/components/icons/MyHobbiesIcon.vue'


// Types
interface NavigationItem {
  name: string
  to: string
  icon: any
}

interface RouteMeta {
  requiresAuth?: boolean
  title?: string
  icon?: any
}

// Route Configuration
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView,
        meta: {
          requiresAuth: true,
          title: 'Home',
          icon: HomeIcon
        }
      },
      {
        path: 'about',
        name: 'about',
        component: AboutView,
        meta: {
          requiresAuth: true,
          title: 'About',
          icon: AboutIcon
        }
      },
       {
        path: 'my-profile',
        name: 'MyProfile',
        component: MyProfileView,
        meta: {
          requiresAuth: true,
          title: 'My Profile',
          icon: AboutIcon
        }
      },
      {
        path: 'my-hobbies',
        name: 'MyHobbies',
        component: MyHobbiesView,
        meta: {
          requiresAuth: true,
          title: 'My Hobbies',
          icon: MyHobbiesIcon
        }
      }


    ]
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      requiresAuth: false,
      title: 'Login'
    }
  },
  {
    path: '/500',
    name: 'server-error',
    component: () => import('@/views/ServerErrorView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
    meta: {
      requiresAuth: false,
      title: 'Not Found'
    }
  }
]

// Router Instance
const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_BASE_URL),
  routes
})

// Navigation Helper
export const getNavigationItems = (routes: RouteRecordRaw[]): NavigationItem[] => {
  const layoutRoute = routes.find(route => route.path === '/')
  if (!layoutRoute?.children) return []

  return layoutRoute.children
    .filter(route => (route.meta as RouteMeta)?.requiresAuth && route.name !== 'not-found')
    .map(route => ({
      name: (route.meta as RouteMeta)?.title || String(route.name),
      to: `/${route.path}`,
      icon: (route.meta as RouteMeta)?.icon
    }))
}

// Navigation Guards
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  // Check if route requires authentication
  if (requiresAuth) {
    // Check if user is authenticated
    const isAuthenticated = await authStore.checkAuth()
    
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      next({ name: 'login', query: { redirect: to.fullPath } })
      return
    }
  }

  // If user is authenticated and trying to access login page
  if (to.name === 'login' && authStore.isAuthenticated) {
    next({ name: 'home' })
    return
  }

  next()
})

export default router 