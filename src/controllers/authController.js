const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// 회원가입
exports.register = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ success: false, message: '이메일과 비밀번호를 입력하세요.' });
        }

        // 비밀번호 해싱 제거
        const user = await User.create({ email, password });

        console.log("저장된 사용자 정보:", user);

        res.status(201).json({
            success: true,
            data: { id: user._id, email: user.email }
        });
    } catch (err) {
        console.error('회원가입 에러:', err.message);
        res.status(500).json({ success: false, message: '서버 에러가 발생했습니다.' });
    }
};

// 로그인 (Access Token + Refresh Token 발급)
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: '사용자를 찾을 수 없습니다.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: '비밀번호가 일치하지 않습니다.' });
        }

        // Access Token 발급
        const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Refresh Token 발급
        const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

        // Refresh Token 저장 (예: DB 또는 메모리)
        user.refreshToken = refreshToken;
        await user.save();

        console.log("저장된 Refresh Token:", user.refreshToken); // 확인용 로그

        res.status(200).json({
            success: true,
            accessToken,
            refreshToken,
        });
    } catch (err) {
        console.error('로그인 에러:', err.message);
        res.status(500).json({ success: false, message: '서버 에러가 발생했습니다.' });
    }
};

// Refresh Token을 통한 Access Token 재발급
exports.refreshToken = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ success: false, message: 'Refresh token이 필요합니다.' });
    }

    try {
        // Refresh Token 검증
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        // 사용자 확인
        const user = await User.findById(decoded.id);
        if (!user || user.refreshToken !== refreshToken) {
            return res.status(401).json({ success: false, message: '유효하지 않은 Refresh token입니다.' });
        }

        // 저장된 Refresh Token과 일치 여부 확인
        if (user.refreshToken !== refreshToken) {
            return res.status(401).json({ success: false, message: '유효하지 않은 Refresh token입니다.' });
        }

        // 새로운 Access Token 발급
        const newAccessToken = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.status(200).json({
            success: true,
            accessToken: newAccessToken,
        });
    } catch (err) {
        console.error('Refresh Token 에러:', err.message);
        res.status(403).json({ success: false, message: '유효하지 않은 Refresh token입니다.' });
    }
};



// 사용자 프로필 조회
exports.getProfile = async (req, res) => {
    try {
        // 인증된 사용자 정보 가져오기
        const user = await User.findById(req.user.id).select('-password'); // 비밀번호 제외
        if (!user) {
            return res.status(404).json({ success: false, message: '사용자를 찾을 수 없습니다.' });
        }

        // 응답
        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (err) {
        console.error('프로필 조회 에러:', err.message);
        res.status(500).json({ success: false, message: '서버 에러가 발생했습니다.' });
    }
};
