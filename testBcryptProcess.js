const bcrypt = require('bcryptjs');

async function testBcrypt() {
    const plainPassword = "1234"; // 원래 비밀번호
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    console.log("원래 비밀번호:", plainPassword);
    console.log("해싱된 비밀번호:", hashedPassword);

    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    console.log("비교 결과:", isMatch);
}

testBcrypt();
