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
  { name: 'claude.png', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Anthropic_logo.svg/512px-Anthropic_logo.svg.png' },
  { name: 'perplexity.png', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Perplexity_AI_logo.svg/512px-Perplexity_AI_logo.svg.png' },
  { name: 'elevenlabs.png', url: 'https://elevenlabs.io/static/img/elevenlabs-logo.png' }
];

async function uploadAll() {
  for (const logo of LOGOS) {
    const localPath = path.join(__dirname, logo.name);
    
    try {
      console.log(`Downloading ${logo.name} using curl...`);
      // Add -k to ignore SSL cert issues if any, and follow redirects
      execSync(`curl -L -k -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36" -o "${localPath}" "${logo.url}"`);
      
      const stats = fs.statSync(localPath);
      console.log(`${logo.name} size: ${stats.size} bytes`);

      if (stats.size < 500) {
          throw new Error('File too small, likely an error page.');
      }

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
