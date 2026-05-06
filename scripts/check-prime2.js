const http = require('https');
const urls = [
  'prime-video-logo.png',
  'prime_video.png',
  'amazon-prime-video.png',
  'prime-logo.png',
  'blocks/prime.png',
  'blocks/prime-video.png',
  'slider/prime-banner.png'
];
const MINIO = 'https://bucket-production-6fef.up.railway.app/streamkart-assets/';

async function check(path) {
  return new Promise(resolve => {
    http.get(MINIO + path, res => {
      resolve({ path, status: res.statusCode });
    });
  });
}

async function run() {
  for (const path of urls) {
    const res = await check(path);
    console.log(res.path, res.status);
  }
}
run();
