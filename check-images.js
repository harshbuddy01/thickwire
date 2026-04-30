const http = require('https');
const urls = [
  'slider/slider1.png',
  'slider/slider2.png',
  'slider/streaming.png',
  'blocks/streaming.png',
  'netflix_3d.png',
  'prime_3d.png',
  'prime-video_3d.png',
  'prime-video.png',
  'netflix.png',
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
