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
  { id: 'spotify', path: '/Users/harshanand/.gemini/antigravity/brain/7be811f1-805f-4622-81fe-8ee3e80d051b/media__1777581136668.png', ct: 'image/png', ext: 'png' },
  { id: 'zee5',    path: '/Users/harshanand/.gemini/antigravity/brain/7be811f1-805f-4622-81fe-8ee3e80d051b/media__1777581141512.jpg', ct: 'image/jpeg', ext: 'jpg' }
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
})();
