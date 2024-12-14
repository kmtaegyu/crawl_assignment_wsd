const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);

    const statusCode = err.status || 500; // 기본값 500 (서버 에러)
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }) // 개발 모드에서만 스택 포함
    });
};

module.exports = errorMiddleware;
