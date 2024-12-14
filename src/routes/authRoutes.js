const express = require('express');
const { register, login, getProfile } = require('../controllers/authController');
//const { register, login } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

console.log(getProfile); // 디버깅: undefined가 아닌 함수 정의가 출력되어야 함

// 회원가입
router.post('/register', register);

// 로그인
router.post('/login', login);

// 사용자 프로필 조회 (JWT 인증 필요)
router.get('/profile', authMiddleware, getProfile);

module.exports = router;
