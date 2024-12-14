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





// 로그인
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 사용자 검색
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: '사용자를 찾을 수 없습니다.' });
        }

        // 디버깅 로그
        console.log("입력된 비밀번호:", password);
        console.log("저장된 비밀번호:", user.password);

        // 비밀번호 비교
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("비밀번호 비교 결과:", isMatch);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: '비밀번호가 일치하지 않습니다.' });
        }

        // JWT 발급
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ success: true, token });
    } catch (err) {
        console.error('로그인 에러:', err.message);
        res.status(500).json({ success: false, message: '서버 에러가 발생했습니다.' });
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
