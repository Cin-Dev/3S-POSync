/**
 * This script injects the service worker configuration from src/config/serviceWorker.ts
 * into public/service-worker.js during the build process.
 * 
 * The process:
 * 1. Reads the TypeScript configuration file
 * 2. Extracts the configuration object
 * 3. Replaces environment variables with their actual values
 * 4. Replaces the template configuration in the service worker file
 * 5. Saves the updated service worker file
 */

const fs = require('fs');
const path = require('path');

// Read the service worker config from the TypeScript file
const configPath = path.resolve(__dirname, '../src/config/serviceWorker.ts');
const configContent = fs.readFileSync(configPath, 'utf8');

// Extract the config object using regex
// This looks for the pattern: const config: ServiceWorkerConfig = { ... };
const configMatch = configContent.match(/const config: ServiceWorkerConfig = ({[\s\S]*?});/);
if (!configMatch) {
  console.error('Could not find config object in serviceWorker.ts');
  process.exit(1);
}

// Get the actual configuration object (everything between the curly braces)
let config = configMatch[1];

// Replace environment variables with their actual values
const isProduction = true; // or process.env.NODE_ENV === 'production'
config = config.replace(
  /process\.env\.NODE_ENV === 'production'/g,
  isProduction ? 'true' : 'false'
);

// Read the service worker template file
const swPath = path.resolve(__dirname, '../public/service-worker.js');
const swContent = fs.readFileSync(swPath, 'utf8');

// Replace the template configuration with the actual configuration
// This replaces everything between "let CONFIG = {" and the closing "};"
const updatedContent = swContent.replace(
  /let CONFIG = {[\s\S]*?};/,
  `let CONFIG = ${config};`
);

// Write the updated service worker file
// This file will be used by the browser as the actual service worker
fs.writeFileSync(swPath, updatedContent);

// Also write to dist directory if it exists
const distSwPath = path.resolve(__dirname, '../dist/service-worker.js');
if (fs.existsSync(path.dirname(distSwPath))) {
  fs.writeFileSync(distSwPath, updatedContent);
}

console.log('Service worker configuration injected successfully'); 