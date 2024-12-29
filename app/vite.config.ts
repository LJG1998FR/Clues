import {defineConfig} from 'vite'
// https://vitejs.dev/config/

export default defineConfig(({ command, mode }) => {
    return {
        server: {
            port: 3000, // Choisir le port que vous souhaitez utiliser, par exemple 3000
        }
    };
});
