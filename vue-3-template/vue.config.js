const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");
const path = require('path');
const fs = require('fs');

// Read and process manifest.json
const manifestPath = path.resolve(__dirname, 'public/manifest.json');
const manifestContent = fs.readFileSync(manifestPath, 'utf8');
const processedManifest = manifestContent
  .replace(/<%= VUE_APP_TITLE %>/g, process.env.VUE_APP_TITLE || 'Vue Template')
  .replace(/<%= VUE_APP_DESCRIPTION %>/g, process.env.VUE_APP_DESCRIPTION || 'A Vue.js template with modern features')
  .replace(/<%= VUE_APP_THEME_COLOR %>/g, process.env.VUE_APP_THEME_COLOR || '#4338CA');

// Write processed manifest
fs.writeFileSync(manifestPath, processedManifest);

module.exports = defineConfig({
  transpileDependencies: [],
  publicPath: process.env.VUE_APP_BASE_URL,
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: {
          plugins: [
            require('tailwindcss'),
            require('autoprefixer'),
          ],
        },
      },
    },
  },
  pwa: {
    name: process.env.VUE_APP_TITLE || 'SP Team Template',
    themeColor: '#ffffff',
    background_color: '#ffffff',
    display: 'standalone',
    orientation: 'portrait',
    start_url: '.',
    scope: '/',
    manifestOptions: {
      short_name: 'SPV',
      description: process.env.VUE_APP_DESCRIPTION || 'A modern template',
      icons: [
        {
          src: './icons/favicon.ico',
          sizes: '64x64 32x32 24x24 16x16',
          type: 'image/x-icon'
        },
        {
          src: './icons/web-app-manifest-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: './icons/web-app-manifest-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    iconPaths: {
      favicon32: 'icons/favicon-96x96.png',
      favicon16: 'icons/favicon-96x96.png',
      appleTouchIcon: 'icons/apple-touch-icon.png',
      maskIcon: 'icons/favicon.svg',
      msTileImage: 'icons/web-app-manifest-144x144.png'
    }
  }
}); 