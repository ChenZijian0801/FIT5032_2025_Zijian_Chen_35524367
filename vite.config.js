import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

<<<<<<< HEAD
// https://vitejs.dev/config/
=======
// https://vite.dev/config/
>>>>>>> 1a06f5027117fb439b709548846240d75310e8b7
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
<<<<<<< HEAD
    }
  }
=======
    },
  },
>>>>>>> 1a06f5027117fb439b709548846240d75310e8b7
})
