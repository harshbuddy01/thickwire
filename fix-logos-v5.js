const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const client = new S3Client({
  endpoint: 'https://bucket-production-6fef.up.railway.app',
  region: 'us-east-1',
  credentials: {
    accessKeyId: '7GdPHwwaCowmEMnHGWN8cxTGLPJlLKXt',
    secretAccessKey: 'Xemvj9jCRukmm2eKrfOte5a0kIggdfEBj9XseiOxk2Di8s0R'
  },
  forcePathStyle: true
});

const LOGOS = [
  { name: 'elevenlabs.png', url: 'https://asset.brandfetch.io/idfS-X-Y-E/idC7O3X2nJ.png' },
  { name: 'claude.png', url: 'https://asset.brandfetch.io/id9yE6E6_M/idB8E5E5_M.png' },
  { name: 'perplexity.png', url: 'https://asset.brandfetch.io/idH7D7D7_M/idC6C6C6_M.png' }
];

async function uploadAll() {
  for (const logo of LOGOS) {
    const localPath = path.join(__dirname, logo.name);
    
    try {
      console.log(`Downloading ${logo.name} using curl...`);
      execSync(`curl -L -A "Mozilla/5.0" -o "${localPath}" "${logo.url}"`);
      
      const stats = fs.statSync(localPath);
      console.log(`${logo.name} size: ${stats.size} bytes`);

      console.log(`Uploading ${logo.name} to MinIO...`);
      const body = fs.readFileSync(localPath);
      await client.send(new PutObjectCommand({
        Bucket: 'streamkart-assets',
        Key: `logos/${logo.name}`,
        Body: body,
        ContentType: 'image/png',
        ACL: 'public-read'
      }));
      console.log(`${logo.name} uploaded successfully.`);
      
      fs.unlinkSync(localPath);
    } catch (err) {
      console.error(`Error processing ${logo.name}:`, err.message);
    }
  }
  console.log('Done!');
}

uploadAll().catch(console.error);
