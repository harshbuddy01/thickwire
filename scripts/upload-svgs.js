const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const client = new S3Client({
  endpoint: 'https://bucket-production-6fef.up.railway.app',
  region: 'us-east-1',
  credentials: {
    accessKeyId: '7GdPHwwaCowmEMnHGWN8cxTGLPJlLKXt',
    secretAccessKey: 'Xemvj9jCRukmm2eKrfOte5a0kIggdfEBj9XseiOxk2Di8s0R'
  },
  forcePathStyle: true
});

// Netflix N icon - hand-crafted SVG (the exact red N shape)
const netflixN = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 111 190">
  <defs>
    <linearGradient id="a" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#B81D24"/>
      <stop offset="100%" style="stop-color:#B81D24"/>
    </linearGradient>
  </defs>
  <path fill="#B81D24" d="M0 0 L0 190 L40 190 L40 70 L75 190 L111 190 L111 0 L71 0 L71 120 L36 0 Z"/>
</svg>`;

// YouTube icon - just the red play button (not the text)
const youtubeIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90">
  <rect width="90" height="90" rx="20" fill="#FF0000"/>
  <polygon points="35,25 35,65 65,45" fill="white"/>
</svg>`;

async function upload(key, content) {
  await client.send(new PutObjectCommand({
    Bucket: 'streamkart-assets',
    Key: key,
    Body: Buffer.from(content),
    ContentType: 'image/svg+xml'
  }));
  console.log(`✅ Uploaded ${key}`);
}

(async () => {
  await upload('logos/netflix.svg', netflixN);
  await upload('logos/youtube.svg', youtubeIcon);
})();
