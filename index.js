import { createServer } from 'http';
import { parse } from 'url';
import { createServer as createViteServer } from 'vite';

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production'; // Xác định chế độ

// Tạo máy chủ Vite
const app = await createViteServer({
    server: { middlewareMode: 'ssr' }, // Đặt chế độ middleware
});

// Tạo máy chủ HTTP
createServer((req, res) => {
    const parsedUrl = parse(req.url, true);

    // Sử dụng app để xử lý yêu cầu
    app.middlewares(req, res, parsedUrl);
}).listen(port, () => {
    console.log(`Server is running at http://localhost:${port} in ${dev ? 'development' : 'production'} mode`);
});
