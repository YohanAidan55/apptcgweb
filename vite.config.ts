import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode })=> {
    const env = loadEnv(mode, process.cwd(), '');
    return ({
        plugins: [react()],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src')
            }
        },
        define: {
            REACT_API_ROOT: JSON.stringify(env.REACT_API_ROOT),
        }
    })
})

