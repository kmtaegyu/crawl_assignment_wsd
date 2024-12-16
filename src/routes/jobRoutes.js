const express = require('express');
//const { getAllJobs, crawlJobs } = require('../controllers/jobController');
const authMiddleware = require('../middleware/authMiddleware'); // 인증 미들웨어 불러오기
const { getAllJobs, crawlJobs } = require('../controllers/jobController');


const router = express.Router();

// 채용 공고 조회 (Get all job listings)
//router.get('/', getAllJobs);

// 채용 공고 조회 (인증 필요)
router.get('/', authMiddleware, getAllJobs);


// 채용 공고 크롤링 (Crawl job listings)
//router.get('/crawl', crawlJobs);
// 채용 공고 크롤링 (인증 필요)
router.get('/crawl', authMiddleware, crawlJobs);

module.exports = router;
