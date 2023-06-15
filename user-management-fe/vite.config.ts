import {defineConfig} from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh';


// https://vitejs.dev/config/
export default ({mode}) =>{
  return defineConfig({
    plugins: [reactRefresh()],
    define: {
      'process.env.NODE_ENV': `"${mode}"`,
    },

    server: {
      fs: {
        strict: false,
      },
      port: 3000,
    },

    preview: {
      port: 3000,
    },
  })
}
