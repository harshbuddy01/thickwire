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

async function upload() {
  const body = fs.readFileSync('/Users/harshanand/.gemini/antigravity/brain/7be811f1-805f-4622-81fe-8ee3e80d051b/sonyliv_hero_bg_1777582789230.png');
  await client.send(new PutObjectCommand({
    Bucket: 'streamkart-assets',
    Key: 'slider/sonyliv-hero-bg.png',
    Body: body,
    ContentType: 'image/png',
    ACL: 'public-read'
  }));
  console.log('Hero bg uploaded');
}
upload();
