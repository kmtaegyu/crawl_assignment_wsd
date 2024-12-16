const express = require('express');
const { register, login, getProfile, refreshToken } = require('../controllers/authController');
//const { register, login } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

console.log(getProfile); // 디버깅: undefined가 아닌 함수 정의가 출력되어야 함

// 회원가입
router.post('/register', register);

// 로그인
router.post('/login', login);

// Access Token 갱신
router.post('/refresh', refreshToken);

// 사용자 프로필 조회 (JWT 인증 필요)
router.get('/profile', authMiddleware, getProfile);

module.exports = router;

//실행 흐름

//1. 로그인 시:
//Access Token과 Refresh Token이 동시에 발급됩니다.
//Refresh Token은 DB에 저장됩니다.

//2. Access Token 만료 시:
//사용자는 /api/auth/refresh에 Refresh Token을 보내 새 Access Token을 요청합니다.

//3. Refresh Token 검증:
//토큰이 유효하고 DB에 저장된 값과 일치하는지 확인합니다.
//새 Access Token을 발급하고 반환합니다.