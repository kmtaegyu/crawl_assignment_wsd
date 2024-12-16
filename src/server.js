require('dotenv').config();
const { connectDB } = require('./config/db');
const app = require('./app');

const PORT = process.env.PORT || 8080;

// 데이터베이스 연결
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
    });
}).catch(err => {
    console.error('Database connection failed:', err.message);
});
