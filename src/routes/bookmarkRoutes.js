const express = require('express');
const { toggleBookmark, getBookmarks } = require('../controllers/bookmarkController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// 북마크 추가/삭제 (토글)
router.post('/', authMiddleware, toggleBookmark);

// 북마크 목록 조회
router.get('/', authMiddleware, getBookmarks);

module.exports = router;
