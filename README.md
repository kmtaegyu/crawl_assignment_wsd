WSD 3차 과제: 구인구직 백엔드 서버

이 프로젝트는 Saramin 데이터를 활용하여 구인구직 백엔드 서버를 구축하는 과제입니다. 웹 크롤링, 데이터베이스 설계, REST API 개발, 인증 시스템 구현 및 JCloud를 활용한 클라우드 배포의 전 과정을 포함합니다.

목차
1.프로젝트 설명
2.설치 및 실행 방법
3.API 엔드포인트
4.환경 변수
5.Swagger 문서
6.배포
7.폴더 구조
-------------------------------------------------
프로젝트 설명

이 백엔드 서버는 **Node.js (Express.js)**와 MongoDB를 사용하여 개발되었습니다. 제공 기능은 다음과 같습니다:

웹 크롤링: Saramin에서 채용 데이터를 크롤링하여 MongoDB에 저장

REST API: 채용 공고, 사용자 관리, 북마크, 지원 관리 기능을 위한 API 제공

인증 시스템: JWT 기반 인증 시스템

클라우드 배포: JCloud에 배포

Swagger 통합: Swagger UI를 통한 API 문서 제공
-------------------------------------------------
설치 및 실행 방법

레포지토리 클론:
git clone https://github.com/kmtaegyu/crawl_assignment_wsd.git
cd your-repository-folder

의존성 설치 : npm install

환경 변수 설정 : 프로젝트 루트에 .env 파일을 생성하고, 환경 변수 섹션에 설명된 대로 설정합니다.

서버 실행
 * 개발 모드 : npm run dev
 * 배포 모드 : npm start

서버 접근 : Swagger UI: http://localhost:8080/api-docs

API 기본 URL: http://localhost:8080/api
-------------------------------------------------
API 엔드포인트

 - 인증(메서드, 엔드포인트, 설명)

POST
/auth/register
회원가입

POST
/auth/login
로그인 및 JWT 발급

POST
/auth/refresh
토큰 갱신

 - 채용 공고(메서드, 엔드포인트, 설명)
1. 회원가입 -> POST /api/auth/register
2. 로그인 -> POST /api/auth/login
3. 로그인 후 발급된 access token을 headers의 Authorization에 넣고 GET 진행 해야함 Bearer accesstoken

GET
/jobs
필터 및 정렬이 가능한 채용 공고 조회

GET
/jobs/:id
특정 채용 공고의 세부 정보 조회

예시
POST http://113.198.66.75:17132/api/auth/register
POST http://113.198.66.75:17132/api/auth/login
GET http://113.198.66.75:17132/api/jobs?location=서울


 - 북마크(메서드, 엔드포인트, 설명)

POST
/bookmarks
북마크 추가 또는 제거

GET
/bookmarks
사용자별 북마크 목록 조회

 - 지원 관리(메서드, 엔드포인트, 설명)

POST
/applications
채용 공고 지원

GET
/applications
지원 내역 조회

DELETE
/applications/:id
지원 취소
-------------------------------------------------
환경 변수

다음 환경 변수를 .env 파일에 설정해야 합니다:

PORT=8080
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
-------------------------------------------------
Swagger 문서

Swagger 문서는 다음 경로에서 확인 가능합니다:

로컬: http://localhost:8080/api-docs

배포 URL: https://jcloud-url:your-port/api-docs
-------------------------------------------------
배포

이 애플리케이션은 JCloud에 배포되었으며, 다음 URL에서 접근 가능합니다:

앱 URL: https://jcloud-url:your-port
-------------------------------------------------
폴더 구조

project-folder/
├── src/
│   ├── controllers/       # 로직 처리 컨트롤러
│   ├── routes/            # API 라우트
│   ├── models/            # 데이터베이스 모델
│   ├── middleware/        # 인증 및 에러 핸들링 미들웨어
│   ├── config/            # 설정 파일 (예: DB 연결)
│   ├── app.js             # 메인 애플리케이션 파일
│   └── server.js          # 서버 시작 파일
├── .env                   # 환경 변수
├── package.json           # 프로젝트 의존성 관리 파일
├── README.md              # 프로젝트 설명 문서
└── swagger.json           # Swagger API 문서
-------------------------------------------------
