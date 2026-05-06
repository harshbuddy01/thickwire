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
  { name: 'chatgpt.svg', url: 'https://www.vectorlogo.zone/logos/openai/openai-icon.svg' },
  { name: 'gemini.svg', url: 'https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304fe6292a20.svg' },
  { name: 'copilot.svg', url: 'https://www.vectorlogo.zone/logos/microsoft_copilot/microsoft_copilot-icon.svg' },
  { name: 'midjourney.svg', url: 'https://www.vectorlogo.zone/logos/midjourney/midjourney-icon.svg' },
  { name: 'notion.svg', url: 'https://www.vectorlogo.zone/logos/notion/notion-icon.svg' },
  { name: 'claude.svg', url: 'https://www.vectorlogo.zone/logos/anthropic/anthropic-icon.svg' },
  { name: 'perplexity.svg', url: 'https://www.vectorlogo.zone/logos/perplexity/perplexity-icon.svg' },
  { name: 'elevenlabs.png', url: 'https://elevenlabs.io/static/img/elevenlabs-logo.png' }
];

async function uploadAll() {
  for (const logo of LOGOS) {
    const localPath = path.join(__dirname, logo.name);
    
    try {
      console.log(`Downloading ${logo.name} using curl...`);
      execSync(`curl -L -k -o "${localPath}" "${logo.url}"`);
      
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
        ContentType: logo.name.endsWith('.svg') ? 'image/svg+xml' : 'image/png',
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
