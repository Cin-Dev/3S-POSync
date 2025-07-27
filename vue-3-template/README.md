# SP Team Vue Template

A clean Vue 3 template with TypeScript, Vue Router, Pinia, and Tailwind CSS, featuring a modern layout with responsive sidebar and dark mode support.

## Project Setup

```bash
# Install dependencies
npm install

# Compile and hot-reload for development
npm run serve

# Compile and minify for production
npm run build

# Lint and fix files
npm run lint
```

## Features

- Vue 3 with Composition API
- TypeScript support
- Vue Router for routing
- Pinia for state management
- Tailwind CSS for styling
- ESLint + Prettier for code formatting
- TypeScript ESLint configuration
- Dark mode support
- Environment variables configuration
- Modular project structure
- Type-safe development environment

## Project Structure

```
src/
├── assets/          # Static assets and global styles
├── components/      # Vue components
├── composables/     # Reusable composition functions
│   ├── auth/       # Authentication related composables
│   └── ui/         # UI related composables
├── config/         # Configuration files
├── router/         # Vue Router configuration
├── services/       # API and other services
├── stores/         # Pinia stores
│   ├── app.ts     # Application state
│   ├── auth.ts    # Authentication state
│   └── theme.ts   # Theme management state
├── types/          # TypeScript type definitions
├── views/          # Page components
├── App.vue         # Root component
├── main.ts         # Application entry point
└── shims-vue.d.ts  # TypeScript declaration file for Vue
```

## State Management with Pinia

The project uses Pinia for state management. Pinia is the official state management solution for Vue 3, offering a simpler and more intuitive API compared to Vuex.

### Available Stores

1. **Auth Store** (`stores/auth.ts`)
   - Manages authentication state
   - Handles login/logout
   - Stores user information
   - Manages authentication tokens

2. **Theme Store** (`stores/theme.ts`)
   - Manages application theme
   - Handles dark/light mode
   - Persists theme preference

3. **App Store** (`stores/app.ts`)
   - Manages application-wide state
   - Handles global loading states
   - Manages application settings

### Using Stores in Components

```typescript
import { defineComponent } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useThemeStore } from '@/stores/theme'

export default defineComponent({
  setup() {
    const authStore = useAuthStore()
    const themeStore = useThemeStore()

    // Access state
    const isAuthenticated = authStore.isAuthenticated
    const currentTheme = themeStore.currentTheme

    // Call actions
    const handleLogin = async () => {
      await authStore.login({ email: 'user@example.com', password: 'password' })
    }

    const toggleTheme = () => {
      themeStore.toggleTheme()
    }

    return {
      isAuthenticated,
      currentTheme,
      handleLogin,
      toggleTheme
    }
  }
})
```

## TypeScript Support

The project is built with TypeScript for better type safety and developer experience. Key TypeScript features include:

- Strict type checking
- Interface definitions
- Type inference
- Type declarations for Vue components
- ESLint TypeScript rules

### TypeScript Configuration

The project uses the following TypeScript-related packages:
- `typescript`
- `@typescript-eslint/eslint-plugin`
- `@typescript-eslint/parser`
- `@vue/eslint-config-typescript`

## Color System

The project includes a comprehensive color system that supports both light and dark modes. Colors are defined in two places:

1. **Tailwind Configuration** (`tailwind.config.js`)
   - Defines color classes for use with Tailwind
   - Provides utility classes for colors

2. **Color Configuration** (`src/config/colors.ts`)
   - Type-safe color definitions
   - Centralized color management
   - Automatic CSS variable generation
   - Support for light and dark variants

### Color Structure

Each color in the system has the following structure:
```typescript
type ColorShade = {
  DEFAULT: string;  // Main color
  hover: string;    // Hover state
  active: string;   // Active/pressed state
  bg: string;       // Background color
  text: string;     // Text color
};

type ColorVariant = {
  light: ColorShade;  // Light mode colors
  dark: ColorShade;   // Dark mode colors
};
```

### Color Categories

The system includes six color categories, each with light and dark variants:
- Primary: Main brand colors
- Secondary: Supporting colors
- Success: Positive actions and states
- Danger: Negative actions and errors
- Warning: Cautionary states
- Info: Informational elements

### Color Utilities

The color system includes utility functions defined in `src/config/colors.ts`:
- `hexToRgb`: Converts hex colors to RGB values
- `rgbToCssVar`: Converts RGB values to CSS variable format
- `generateColorVariables`: Generates CSS variables for the entire color scheme

### Usage Example

```typescript
// Using color configuration and utilities
import { colors, generateColorVariables } from '@/config/colors';

// Access specific colors
const primaryColor = colors.primary.light.DEFAULT;
const darkModeText = colors.primary.dark.text;

// Generate CSS variables for the entire color scheme
const cssVariables = generateColorVariables();
```

### Customizing Colors

To change the colors in the project, follow these steps:

1. **Update Color Definitions** (`src/config/colors.ts`)
   ```typescript
   // Example: Changing primary colors
   export const colors: ColorScheme = {
     primary: {
       light: {
         DEFAULT: '#4338CA', // Change this to your desired color
         hover: '#3730A3',   // Usually a darker shade
         active: '#312E81',  // Usually the darkest shade
         bg: '#EEF2FF',      // Usually a very light shade
         text: '#4338CA',    // Usually same as DEFAULT
       },
       dark: {
         DEFAULT: '#6366F1', // Change this to your desired color
         hover: '#818CF8',   // Usually a lighter shade
         active: '#A5B4FC',  // Usually the lightest shade
         bg: '#1E293B',      // Usually a dark shade
         text: '#E0E7FF',    // Usually a light shade
       }
     },
     // ... other colors
   };
   ```

2. **Apply CSS Variables** (in your main CSS file or component)
   ```typescript
   import { generateColorVariables } from '@/config/colors';
   
   // Generate and apply CSS variables
   const cssVariables = generateColorVariables();
   Object.entries(cssVariables).forEach(([key, value]) => {
     document.documentElement.style.setProperty(key, value);
   });
   ```

3. **Using the New Colors**
   ```html
   <!-- Light mode -->
   <div class="bg-primary-bg text-primary-text">
     <button class="bg-primary hover:bg-primary-hover active:bg-primary-active">
       Click me
     </button>
   </div>

   <!-- Dark mode -->
   <div class="dark:bg-primary-dark-bg dark:text-primary-dark-text">
     <button class="dark:bg-primary-dark dark:hover:bg-primary-dark-hover dark:active:bg-primary-dark-active">
       Click me
     </button>
   </div>
   ```

> **Note**: The `tailwind.config.js` file is already configured to use CSS variables for all colors. You don't need to modify it when changing colors. The configuration uses CSS variables that are automatically generated from your color definitions in `colors.ts`.

### Color Selection Tips

1. **Light Mode Colors**
   - `DEFAULT`: Main brand color
   - `hover`: 10-20% darker than DEFAULT
   - `active`: 20-30% darker than DEFAULT
   - `bg`: 90-95% lighter than DEFAULT
   - `text`: Usually same as DEFAULT

2. **Dark Mode Colors**
   - `DEFAULT`: Slightly lighter than light mode DEFAULT
   - `hover`: 10-20% lighter than DEFAULT
   - `active`: 20-30% lighter than DEFAULT
   - `bg`: Dark background (usually dark gray/blue)
   - `text`: Light text color for contrast

3. **Color Tools**
   - Use color pickers like [Tailwind Color Generator](https://uicolors.app/create)
   - Ensure sufficient contrast ratios for accessibility
   - Test colors in both light and dark modes

## Environment Variables

The project uses environment variables for configuration. Create the following files in the root directory:

- `.env` - Default environment variables
- `.env.development` - Development environment variables
- `.env.production` - Production environment variables

Required variables:
```
# Application Info
VUE_APP_TITLE=
VUE_APP_DESCRIPTION=
VUE_APP_BASE_URL=
VUE_APP_THEME_COLOR=

# API Configuration
VUE_APP_API_URL=
```

### Environment Variable Usage

1. **In Vue Components**
   ```typescript
   // Access environment variables
   const appTitle = process.env.VUE_APP_TITLE
   const apiUrl = process.env.VUE_APP_API_URL
   ```

2. **In index.html**
   ```html
   <!-- Title -->
   <title><%= VUE_APP_TITLE %></title>
   
   <!-- Meta Tags -->
   <meta name="description" content="<%= VUE_APP_DESCRIPTION %>">
   
   <!-- Open Graph -->
   <meta property="og:url" content="<%= VUE_APP_BASE_URL %>">
   ```

3. **In Configuration Files**
   ```javascript
   // vue.config.js
   module.exports = {
     publicPath: process.env.VUE_APP_BASE_URL
   }
   ```

> **Note**: All environment variables must be prefixed with `VUE_APP_` to be accessible in the Vue application. Variables without this prefix will not be available.

## Customize Configuration

See [Configuration Reference](https://cli.vuejs.org/config/). 

### Theme Color Usage

The `VUE_APP_THEME_COLOR` environment variable can be used in several places:

1. **Browser Theme Color**
   ```html
   <!-- In index.html -->
   <meta name="theme-color" content="<%= VUE_APP_THEME_COLOR %>">
   ```
   This sets the browser's theme color (visible in mobile browsers' address bar and PWA installations).

2. **Theme Store**
   ```typescript
   // In your components
   import { useThemeStore } from '@/stores/theme'
   
   const themeStore = useThemeStore()
   const themeColor = themeStore.themeColor
   ```
   The theme store automatically manages the theme color and updates the meta tag when the theme changes.

3. **CSS Variables**
   ```css
   :root {
     --theme-color: v-bind(themeColor);
   }
   
   .my-element {
     background-color: var(--theme-color);
   }
   ```
   Use the theme color in your components' styles.

4. **Tailwind Configuration**
   ```javascript
   // In tailwind.config.js
   module.exports = {
     theme: {
       extend: {
         colors: {
           theme: {
             DEFAULT: 'var(--theme-color)',
             // ... other shades
           }
         }
       }
     }
   }
   ```
   Then use it in your templates:
   ```html
   <div class="bg-theme text-white">
     This uses the theme color
   </div>
   ```

5. **PWA Manifest**
   ```json
   {
     "theme_color": "<%= VUE_APP_THEME_COLOR %>",
     "background_color": "<%= VUE_APP_THEME_COLOR %>"
   }
   ```
   Use the theme color in your PWA manifest for a consistent look when installed. 

### Progressive Web App (PWA) Setup

The project includes PWA support through a manifest file and service worker. To complete the PWA setup:

1. **Create Icons**
   Create the following icons in `public/icons/`:
   ```
   public/icons/
   ├── icon-72x72.png
   ├── icon-96x96.png
   ├── icon-128x128.png
   ├── icon-144x144.png
   ├── icon-152x152.png
   ├── icon-192x192.png
   ├── icon-384x384.png
   └── icon-512x512.png
   ```

   You can use tools like:
   - [PWA Asset Generator](https://github.com/elegantapp/pwa-asset-generator)
   - [Real Favicon Generator](https://realfavicongenerator.net/)
   - [Favicon.io](https://favicon.io/)

2. **Add Screenshots**
   Add app screenshots in `public/screenshots/`:
   ```
   public/screenshots/
   └── home.png  # 1280x720 recommended
   ```

3. **Update Manifest**
   The `public/manifest.json` file is already configured with:
   - App name and description from environment variables
   - Theme colors from environment variables
   - Icon configurations
   - App shortcuts
   - Screenshot configurations
   - Other PWA settings

4. **Environment Variables**
   Make sure these variables are set in your `.env` file:
   ```
   VUE_APP_TITLE=Your App Name
   VUE_APP_DESCRIPTION=Your app description
   VUE_APP_THEME_COLOR=#4338CA
   ```

5. **Testing PWA**
   - Build your app: `npm run build`
   - Serve the built files: `npx serve dist`
   - Open in Chrome and check:
     - Application tab > Manifest
     - Application tab > Service Workers
     - Lighthouse audit

### Service Worker Configuration

The service worker is configured using the `src/config/serviceWorker.ts` file. This configuration is injected into `public/service-worker.js` during the build process.

#### How It Works

1. **Configuration Source:**  
   The configuration is defined in `src/config/serviceWorker.ts` as a TypeScript object:
   ```ts
   const config: ServiceWorkerConfig = {
     enabled: process.env.NODE_ENV === 'production',
     cacheEnabled: process.env.NODE_ENV === 'production',
     cacheName: 'vue-template-v1',
     urlsToCache: [
       '/',
       '/index.html',
       '/manifest.json',
       '/icons/favicon.ico',
       '/icons/favicon.svg',
       '/icons/apple-touch-icon.png',
       '/icons/favicon-96x96.png',
       '/icons/web-app-manifest-192x192.png',
       '/icons/web-app-manifest-512x512.png'
     ],
     updateInterval: 60 * 60 * 1000, // 1 hour
     skipWaiting: true,
     clientsClaim: true
   };
   ```

2. **Injection Process:**  
   During the build process, the `scripts/inject-service-worker-config.js` script:
   - Reads the configuration from `src/config/serviceWorker.ts`.
   - Replaces environment variables (e.g., `process.env.NODE_ENV`) with their actual values.
   - Injects the updated configuration into `public/service-worker.js`.

3. **Final Output:**  
   The built service worker (`dist/service-worker.js`) will have the configuration injected, ensuring it is enabled in production.

#### Customizing the Configuration

- **Enable/Disable Caching:**  
  Set `cacheEnabled` to `true` or `false` in `src/config/serviceWorker.ts`.

- **Cache Name:**  
  Change `cacheName` to a unique name for your app.

- **URLs to Cache:**  
  Modify the `urlsToCache` array to include or exclude specific assets.

- **Update Interval:**  
  Adjust `updateInterval` to control how often the service worker checks for updates.

#### Testing the Service Worker

- **Build the App:**  
  Run `npm run build` to generate the production build with the injected configuration.

- **Deploy and Test:**  
  Deploy the app and verify that the service worker is registered and caching works as expected.

- **Verify Caching:**
  - Open Chrome DevTools > Application > Cache Storage.
  - Check if the assets listed in `urlsToCache` are cached.

- **Test Offline Functionality:**
  - In Chrome DevTools, go to Network > Offline.
  - Refresh the page and verify that the app loads from the cache.

- **Check Service Worker Registration:**
  - In Chrome DevTools, go to Application > Service Workers.
  - Ensure the service worker is registered and active.
