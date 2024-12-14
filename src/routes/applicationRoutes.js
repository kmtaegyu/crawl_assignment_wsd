const express = require('express');
const { createApplication, getApplications, deleteApplication } = require('../controllers/applicationController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// 지원하기
router.post('/', authMiddleware, createApplication);

// 지원 내역 조회
router.get('/', authMiddleware, getApplications);

// 지원 취소
router.delete('/:id', authMiddleware, deleteApplication);

module.exports = router;
