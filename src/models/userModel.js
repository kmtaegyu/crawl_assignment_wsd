const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // bcrypt 대신 bcryptjs 사용

// User 스키마 정의
const userSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: [/^\S+@\S+\.\S+$/, '올바른 이메일 형식을 입력하세요.'] // 이메일 형식 검증 추가
    },
    password: { type: String, required: true },
    refreshToken: { type: String }, // Refresh Token 저장 필드 추가
    bookmarks: [ // 북마크 필드 추가
        {
            jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' }, // 참조하는 Job ID
            createdAt: { type: Date, default: Date.now }, // 북마크 저장 시간
        }
    ],
}, { timestamps: true }); // 생성 및 수정 시간 자동 저장

// 비밀번호 해싱
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // 비밀번호가 수정되지 않으면 해싱 생략
    
    console.log('원래 비밀번호:', this.password); // 디버깅 로그
    this.password = await bcrypt.hash(this.password, 10);
    console.log('해싱된 비밀번호:', this.password); // 디버깅 로그
    
    next();
});

// 비밀번호 검증 메서드
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
