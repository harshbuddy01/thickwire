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

// Amazon Prime Video - the teal "prime video" icon (square)
const primeIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="18" fill="#00A8E0"/>
  <text x="50" y="42" font-family="Arial" font-weight="900" font-size="22" fill="white" text-anchor="middle">prime</text>
  <text x="50" y="64" font-family="Arial" font-weight="400" font-size="16" fill="white" text-anchor="middle">video</text>
  <path d="M20 72 Q50 84 80 72" stroke="white" stroke-width="3" fill="none" stroke-linecap="round"/>
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
  await upload('logos/prime.svg', primeIcon);
})();
