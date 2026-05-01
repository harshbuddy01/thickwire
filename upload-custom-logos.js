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
  { id: 'disney',   path: '/Users/harshanand/.gemini/antigravity/brain/7be811f1-805f-4622-81fe-8ee3e80d051b/.tempmediaStorage/media_7be811f1-805f-4622-81fe-8ee3e80d051b_1777579824152.png' },
  { id: 'youtube',  path: '/Users/harshanand/.gemini/antigravity/brain/7be811f1-805f-4622-81fe-8ee3e80d051b/.tempmediaStorage/media_7be811f1-805f-4622-81fe-8ee3e80d051b_1777579835426.png' },
  { id: 'hbomax',   path: '/Users/harshanand/.gemini/antigravity/brain/7be811f1-805f-4622-81fe-8ee3e80d051b/.tempmediaStorage/media_7be811f1-805f-4622-81fe-8ee3e80d051b_1777579843125.png' },
  { id: 'jiosaavn', path: '/Users/harshanand/.gemini/antigravity/brain/7be811f1-805f-4622-81fe-8ee3e80d051b/.tempmediaStorage/media_7be811f1-805f-4622-81fe-8ee3e80d051b_1777579860903.png' },
  { id: 'sonyliv',  path: '/Users/harshanand/.gemini/antigravity/brain/7be811f1-805f-4622-81fe-8ee3e80d051b/.tempmediaStorage/media_7be811f1-805f-4622-81fe-8ee3e80d051b_1777579872702.png' }
];

async function upload(item) {
  try {
    const body = fs.readFileSync(item.path);
    const key = `logos/${item.id}.png`;
    await client.send(new PutObjectCommand({
      Bucket: 'streamkart-assets',
      Key: key,
      Body: body,
      ContentType: 'image/png',
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
