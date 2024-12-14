const mongoose = require('mongoose');
const Application = require('../models/applicationModel');

// 지원하기
exports.createApplication = async (req, res) => {
    const { jobId } = req.body;
    const userId = req.user.id;

    try {
        // 중복 지원 확인
        const existingApplication = await Application.findOne({ userId, jobId });
        if (existingApplication) {
            return res.status(400).json({ message: '이미 지원한 공고입니다.' });
        }

        // 지원 내역 생성
        const application = new Application({ userId, jobId, status: '지원 완료' });
        await application.save();
        res.status(201).json({ message: '지원 완료', application });
    } catch (error) {
        res.status(500).json({ message: '서버 오류', error: error.message });
    }
};

// 지원 내역 조회
exports.getApplications = async (req, res) => {
    const userId = req.user.id;

    try {
        const applications = await Application.find({ userId }).populate('jobId');
        res.status(200).json({ applications });
    } catch (error) {
        res.status(500).json({ message: '서버 오류', error: error.message });
    }
};

// 지원 취소
exports.deleteApplication = async (req, res) => {
    const { id } = req.params; // 지원 ID
    const userId = req.user.id; // 현재 사용자 ID

    try {
        // 1. ID 형식 검증
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: '잘못된 지원 ID 형식입니다.' });
        }

        // 2. 지원 내역 조회
        const application = await Application.findById(id);

        // 3. 지원 내역 존재 여부 확인
        if (!application) {
            return res.status(404).json({ message: '지원 내역을 찾을 수 없습니다.' });
        }

        // 4. 권한 확인 (현재 사용자와 지원 내역의 사용자 비교)
        if (application.userId.toString() !== userId) {
            return res.status(403).json({ message: '권한이 없습니다.' });
        }

        // 5. 지원 내역 삭제
        await Application.findByIdAndDelete(id);
        res.status(200).json({ message: '지원 취소 완료' });

    } catch (error) {
        console.error('지원 취소 에러:', error.message); // 에러 로그 기록
        res.status(500).json({ message: '서버 오류', error: error.message });
    }
};
