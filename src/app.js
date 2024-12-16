const express = require('express');
const path = require('path');
const dotenv = require('dotenv'); // 환경 변수 로드
const cors = require('cors');
const morgan = require('morgan');

const jobRoutes = require('./routes/jobRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const bookmarkRoutes = require('./routes/bookmarkRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const { connectDB } = require('./config/db');

dotenv.config(); // .env 파일 로드

const app = express();
//const PORT = process.env.PORT || 8080;

// MongoDB 연결
//connectDB();

// 미들웨어
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api/jobs', jobRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bookmarks', bookmarkRoutes);
app.use('/api/applications', applicationRoutes);

// Error Middleware
app.use(errorMiddleware);

module.exports = app;

// 서버 실행
//app.listen(PORT, () => {
//    console.log(`Server running on http://localhost:${PORT}`);
//});
