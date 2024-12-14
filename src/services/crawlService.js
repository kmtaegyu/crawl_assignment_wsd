const axios = require('axios');
const cheerio = require('cheerio');
const Job = require('../models/jobModel');

async function crawlSaramin(keyword = '개발자', pages = 1) {
  const jobs = [];
  const baseURL = 'https://www.saramin.co.kr/zf_user/search/recruit';

  for (let page = 1; page <= pages; page++) {
    const url = `${baseURL}?searchType=search&searchword=${keyword}&recruitPage=${page}`;

    try {
      // 요청 보내기
      const { data } = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        },
      });

      // 데이터 파싱
      const $ = cheerio.load(data);
      const jobListings = $('.item_recruit');

      jobListings.each((_, element) => {
        try {
          const company = $(element).find('.corp_name a').text().trim();
          const title = $(element).find('.job_tit a').text().trim();
          const link = 'https://www.saramin.co.kr' + $(element).find('.job_tit a').attr('href');

          const conditions = $(element).find('.job_condition span');
          const location = $(conditions[0]).text().trim() || '';
          const experience = $(conditions[1]).text().trim() || '';
          const education = $(conditions[2]).text().trim() || '';
          const employmentType = $(conditions[3]).text().trim() || '';

          const deadline = $(element).find('.job_date .date').text().trim();
          const sector = $(element).find('.job_sector').text().trim() || '';
          const salary = $(element).find('.area_badge .badge').text().trim() || '';

          jobs.push({
            title,
            company,
            location,
            experience,
            education,
            employmentType,
            deadline,
            sector,
            salary,
            link,
          });
        } catch (err) {
          console.error('항목 파싱 중 에러:', err.message);
        }
      });

      console.log(`${page} 페이지 크롤링 완료`);
    } catch (err) {
      console.error('크롤링 요청 에러:', err.message);
    }
  }

  return jobs;
}

// MongoDB 저장
async function saveJobsToDB(jobs) {
  for (const job of jobs) {
    const existingJob = await Job.findOne({ link: job.link });
    if (!existingJob) {
      await Job.create(job);
      console.log(`저장 완료: ${job.title}`);
    } else {
      console.log(`중복 데이터 스킵: ${job.title}`);
    }
  }
}

module.exports = { crawlSaramin, saveJobsToDB };
