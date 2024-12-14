const mongoose = require('mongoose');
const User = require('../models/userModel');
const Job = require('../models/jobModel');

// 북마크 추가/삭제
exports.toggleBookmark = async (req, res) => {
    const { jobId } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: '사용자를 찾을 수 없습니다.' });
        }

        // 로그 추가
        console.log('사용자 북마크 목록:', user.bookmarks);
        console.log('요청된 jobId:', jobId);

        // jobId 비교
        const bookmarkIndex = user.bookmarks.findIndex(
            (bookmark) => bookmark.jobId.toString() === jobId.toString()
        );

        console.log('북마크 인덱스:', bookmarkIndex);

        if (bookmarkIndex === -1) {
            // 북마크 추가
            user.bookmarks.push({ jobId });
            await user.save();
            console.log('북마크 추가 완료');
            return res.status(200).json({ message: 'Bookmark added' });
        } else {
            // 북마크 제거
            user.bookmarks.splice(bookmarkIndex, 1);
            await user.save();
            console.log('북마크 제거 완료');
            return res.status(200).json({ message: 'Bookmark removed' });
        }
    } catch (err) {
        console.error('Error toggling bookmark:', err);
        res.status(500).json({ success: false, message: '서버 에러가 발생했습니다.' });
    }
};


// 북마크 목록 조회
exports.getBookmarks = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('bookmarks.jobId');
        if (!user) {
            return res.status(404).json({ success: false, message: '사용자를 찾을 수 없습니다.' });
        }

        const bookmarks = user.bookmarks.map((b) => ({
            jobId: b.jobId._id,
            title: b.jobId.title,
            company: b.jobId.company,
            createdAt: b.createdAt,
        }));

        res.status(200).json({ success: true, data: bookmarks });
    } catch (err) {
        console.error('Error fetching bookmarks:', err);
        res.status(500).json({ success: false, message: '서버 에러가 발생했습니다.' });
    }
};
