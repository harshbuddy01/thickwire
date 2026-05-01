const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');

const client = new S3Client({
  endpoint: 'https://bucket-production-6fef.up.railway.app',
  region: 'us-east-1',
  credentials: {
    accessKeyId: '7GdPHwwaCowmEMnHGWN8cxTGLPJlLKXt',
    secretAccessKey: 'Xemvj9jCRukmm2eKrfOte5a0kIggdfEBj9XseiOxk2Di8s0R'
  },
  forcePathStyle: true
});

const uploads = [
  { id: 'disney', path: '/Users/harshanand/.gemini/antigravity/brain/7be811f1-805f-4622-81fe-8ee3e80d051b/media__1777581062873.jpg', ct: 'image/jpeg', ext: 'jpg' },
  { id: 'youtube', path: '/Users/harshanand/.gemini/antigravity/brain/7be811f1-805f-4622-81fe-8ee3e80d051b/media__1777581062877.png', ct: 'image/png', ext: 'png' },
  { id: 'hbomax', path: '/Users/harshanand/.gemini/antigravity/brain/7be811f1-805f-4622-81fe-8ee3e80d051b/media__1777581062938.jpg', ct: 'image/jpeg', ext: 'jpg' },
  { id: 'jiosaavn', path: '/Users/harshanand/.gemini/antigravity/brain/7be811f1-805f-4622-81fe-8ee3e80d051b/media__1777581062941.png', ct: 'image/png', ext: 'png' },
  { id: 'sonyliv', path: '/Users/harshanand/.gemini/antigravity/brain/7be811f1-805f-4622-81fe-8ee3e80d051b/media__1777581068594.jpg', ct: 'image/jpeg', ext: 'jpg' }
];

async function upload(item) {
  try {
    const body = fs.readFileSync(item.path);
    const key = `logos/${item.id}.${item.ext}`;
    await client.send(new PutObjectCommand({
      Bucket: 'streamkart-assets',
      Key: key,
      Body: body,
      ContentType: item.ct,
      ACL: 'public-read'
    }));
    console.log(`Uploaded ${key}`);
  } catch (err) {
    console.error(`Failed ${item.id}`, err.message);
  }
}

(async () => {
  for (const up of uploads) await upload(up);
  console.log('All 5 missing logos uploaded');
})();
