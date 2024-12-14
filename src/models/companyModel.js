const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // 회사 이름
    location: { type: String, required: true }, // 회사 위치
    industry: { type: String, default: 'Not specified' }, // 산업 분야
    website: { type: String, default: '' }, // 회사 웹사이트 링크
    createdAt: { type: Date, default: Date.now }, // 생성일
});

module.exports = mongoose.model('Company', companySchema);
