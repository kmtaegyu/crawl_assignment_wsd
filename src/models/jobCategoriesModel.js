const mongoose = require('mongoose');

const jobCategorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // 카테고리 이름
    description: { type: String, default: 'No description' }, // 카테고리 설명
    createdAt: { type: Date, default: Date.now }, // 생성일
});

module.exports = mongoose.model('JobCategory', jobCategorySchema);
