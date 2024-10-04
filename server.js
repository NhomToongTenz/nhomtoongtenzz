import { createServer } from 'http';
import { parse } from 'url';
import { createServer as createViteServer } from 'vite';

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production'; // Determine mode

// Create Vite server
const app = await createViteServer({
    server: { middlewareMode: 'ssr' }, // Set middleware mode
});

// Create HTTP server
createServer((req, res) => {
    const parsedUrl = parse(req.url, true);

    // Use app to handle requests
    app.middlewares(req, res, parsedUrl);
}).listen(port, () => {
    console.log(`Server is running at http://localhost:${port} in ${dev ? 'development' : 'production'} mode`);
});