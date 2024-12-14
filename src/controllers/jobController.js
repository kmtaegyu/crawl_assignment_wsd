const { crawlSaramin } = require('../services/crawlService');
const Job = require('../models/jobModel');

exports.getAllJobs = async (req, res) => {
    try {
        // 쿼리 파라미터 가져오기
        const { page = 1, limit = 10, sort, location, experience } = req.query;

        // 필터 조건 설정
        const filter = {};
        if (location) filter.location = { $regex: location, $options: 'i' }; // 지역 필터
        if (experience) filter.experience = { $regex: experience, $options: 'i' }; // 경력 필터

        // 정렬 조건 설정
        const sortOptions = {};
        if (sort) {
            const sortField = sort.startsWith('-') ? sort.substring(1) : sort;
            const sortOrder = sort.startsWith('-') ? -1 : 1;
            sortOptions[sortField] = sortOrder;
        }

        // 페이지네이션 설정
        const skip = (page - 1) * limit;

        // MongoDB 쿼리 실행
        const jobs = await Job.find(filter)
            .sort(sortOptions)
            .skip(skip)
            .limit(Number(limit));

        // 전체 공고 수 계산
        const totalJobs = await Job.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: jobs,
            pagination: {
                currentPage: Number(page),
                totalPages: Math.ceil(totalJobs / limit),
                totalItems: totalJobs,
            },
        });
    } catch (err) {
        console.error('Error fetching jobs:', err);
        res.status(500).json({ success: false, message: '서버 에러가 발생했습니다.' });
    }
};


exports.crawlJobs = async (req, res) => {
    //const { keyword, pages } = req.query;
    const { keyword = 'default', pages = 1 } = req.query; // 기본값 설정

    try {
        const crawledJobs = await crawlSaramin(keyword, pages || 1);
        res.status(200).json({ success: true, data: crawledJobs });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
