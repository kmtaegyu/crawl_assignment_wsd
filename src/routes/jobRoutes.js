const express = require('express');
const { getAllJobs, crawlJobs } = require('../controllers/jobController');

const router = express.Router();

// 채용 공고 조회 (Get all job listings)
router.get('/', getAllJobs);

// 채용 공고 크롤링 (Crawl job listings)
router.get('/crawl', crawlJobs);

module.exports = router;
