const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // MongoDB에 연결
        //const conn = await mongoose.connect(process.env.MONGO_URI, {
        //    useNewUrlParser: true,        // 새로운 URL 파서 사용
        //    useUnifiedTopology: true,    // 서버 발견 및 모니터링 엔진 사용
        //});
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1); // 실패 시 프로세스 종료
    }
};

module.exports = { connectDB };
