const http = require('https');
const urls = [
  'prime.png',
  'prime_logo.png',
  'amazon-prime.png',
  'amazon_prime.png',
  'primevideo.png',
  'amazon.png'
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
