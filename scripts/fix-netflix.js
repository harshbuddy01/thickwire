const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const axios = require('axios');

const client = new S3Client({
  endpoint: 'https://bucket-production-6fef.up.railway.app',
  region: 'us-east-1',
  credentials: {
    accessKeyId: '7GdPHwwaCowmEMnHGWN8cxTGLPJlLKXt',
    secretAccessKey: 'Xemvj9jCRukmm2eKrfOte5a0kIggdfEBj9XseiOxk2Di8s0R'
  },
  forcePathStyle: true
});

// Try multiple Netflix N icon sources
const netflixUrls = [
  'https://upload.wikimedia.org/wikipedia/commons/7/7a/Looper_-_Netflix_icon.svg',
  'https://upload.wikimedia.org/wikipedia/commons/6/69/Netflix_logo.svg',
  'https://cdn.brandfetch.io/netflix.com/w/512/h/512',
];

async function tryUpload() {
  for (const url of netflixUrls) {
    try {
      const res = await axios.get(url, { responseType: 'arraybuffer', timeout: 8000, headers: { 'User-Agent': 'Mozilla/5.0' } });
      const ct = res.headers['content-type'] || 'image/png';
      const ext = ct.includes('svg') ? 'svg' : 'png';
      const key = `logos/netflix.${ext}`;
      await client.send(new PutObjectCommand({ Bucket: 'streamkart-assets', Key: key, Body: res.data, ContentType: ct }));
      console.log(`✅ Netflix uploaded as ${key} from ${url}`);
      return;
    } catch(e) {
      console.log(`❌ ${url} failed: ${e.message}`);
    }
  }
}
tryUpload();
