import { defineConfig } from 'vite'
import { configDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  test: {
    ...configDefaults,
    environment: 'jsdom', // This sets up a browser-like environment (needed for testing React components)
    globals: true,         // This ensures `expect` is available globally
  },
  }
)
