import { defineConfig } from 'vite'
import { fileURLToPath, URL} from 'node:url'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //agregamos este fragmento de código
  resolve: {
    alias: {
      '@' :fileURLToPath(new URL('./src', import.meta.url)) //Definimos el @ para que apunte a ./src
    }
  }
})
