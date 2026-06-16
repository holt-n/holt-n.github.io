import { defineConfig } from 'vite'

// This is a user/organisation Pages site served from a custom apex domain
// (titan-applications.com), so the site lives at the web root and `base` is '/'.
export default defineConfig({
  base: '/',
  build: {
    target: 'es2022'
  }
})
