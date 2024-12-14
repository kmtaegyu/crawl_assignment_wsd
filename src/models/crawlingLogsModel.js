const mongoose = require('mongoose');

const crawlingLogSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now }, // 크롤링 작업 시간
    status: { type: String, enum: ['success', 'error'], required: true }, // 크롤링 작업 상태
    message: { type: String, default: '' }, // 에러 메시지 또는 상태 메시지
    recordsFetched: { type: Number, default: 0 }, // 수집된 데이터 수
});

module.exports = mongoose.model('CrawlingLog', crawlingLogSchema);
