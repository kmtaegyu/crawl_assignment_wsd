const express = require('express');
const path = require('path');
const jobRoutes = require('./routes/jobRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');
const swaggerUi = require('swagger-ui-express');
//const swaggerDocument = require(path.join(__dirname, '../swagger.yaml'));
const swaggerDocument = require('../swagger.json'); // JSON 파일로 변경
const bookmarkRoutes = require('./routes/bookmarkRoutes');
const applicationRoutes = require('./routes/applicationRoutes');



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api/jobs', jobRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
// 북마크 라우트 추가
app.use('/api/bookmarks', bookmarkRoutes);

app.use('/api/applications', applicationRoutes);

// Error Middleware
app.use(errorMiddleware);

module.exports = app;
