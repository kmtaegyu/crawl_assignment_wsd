const bcrypt = require('bcryptjs');

const storedPassword = "$2b$10$sKf37tUQWjgx5g7eQld21uC8LGd2VyIDlHLs0H3ZCs/hAhjxLp5em"; // MongoDB에 저장된 비밀번호
const plainPassword = "1234"; // 입력한 비밀번호

async function verifyPassword() {
    // 입력된 비밀번호를 새로 해싱
    const newHashedPassword = await bcrypt.hash(plainPassword, 10);
    console.log("새로 해싱된 비밀번호:", newHashedPassword);

    // 기존 저장된 비밀번호와 입력된 비밀번호 비교
    const isMatch = await bcrypt.compare(plainPassword, storedPassword);
    console.log("비교 결과 (기존 저장된 비밀번호와):", isMatch);

    // 새로 해싱된 비밀번호와 비교
    const isMatchWithNewHash = await bcrypt.compare(plainPassword, newHashedPassword);
    console.log("비교 결과 (새로 해싱된 비밀번호와):", isMatchWithNewHash);
}

verifyPassword();
