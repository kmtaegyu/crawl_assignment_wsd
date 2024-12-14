const mongoose = require('mongoose');

const jobStatisticsSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true }, // 채용 공고 ID 참조
    views: { type: Number, default: 0 }, // 조회수
    applications: { type: Number, default: 0 }, // 지원 횟수
    bookmarks: { type: Number, default: 0 }, // 북마크 횟수
    updatedAt: { type: Date, default: Date.now }, // 마지막 업데이트 시간
});

module.exports = mongoose.model('JobStatistics', jobStatisticsSchema);
