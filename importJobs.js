const { crawlSaramin, saveJobsToDB } = require('./src/services/crawlService');
require('dotenv').config();
const mongoose = require('mongoose');

// MongoDB 연결
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    console.log('크롤링 시작...');
    const jobs = await crawlSaramin('개발자', 2); // '개발자' 키워드, 2페이지 크롤링
    console.log('크롤링 완료! MongoDB에 저장 중...');
    await saveJobsToDB(jobs);
    console.log('모든 데이터 저장 완료!');
    process.exit(0);
  } catch (err) {
    console.error(`에러 발생: ${err.message}`);
    process.exit(1);
  }
}

run();
