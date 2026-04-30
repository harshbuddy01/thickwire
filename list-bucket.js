const { S3Client, ListObjectsV2Command } = require('@aws-sdk/client-s3');

const client = new S3Client({
  endpoint: 'https://bucket-production-6fef.up.railway.app',
  region: 'us-east-1',
  credentials: {
    accessKeyId: '7GdPHwwaCowmEMnHGWN8cxTGLPJlLKXt',
    secretAccessKey: 'Xemvj9jCRukmm2eKrfOte5a0kIggdfEBj9XseiOxk2Di8s0R'
  },
  forcePathStyle: true
});

async function list() {
  try {
    const data = await client.send(new ListObjectsV2Command({ Bucket: 'streamkart-assets' }));
    if (data.Contents) {
      data.Contents.forEach(obj => console.log(obj.Key));
    }
  } catch (err) {
    console.error(err);
  }
}
list();
