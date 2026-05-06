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

async function upload(file, key) {
  try {
    const fileStream = fs.createReadStream(file);
    await client.send(new PutObjectCommand({
      Bucket: 'streamkart-assets',
      Key: key,
      Body: fileStream,
      ContentType: 'image/png'
    }));
    console.log('Uploaded', key);
  } catch (err) {
    console.error('Error uploading', err);
  }
}

upload('/Users/harshanand/.gemini/antigravity/scratch/thickwire/public/streamkart-logo.png', 'streamkart-logo.png');
