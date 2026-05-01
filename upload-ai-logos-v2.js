const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const https = require('https');
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
  { 
    name: 'claude.png', 
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Anthropic_logo.svg/1200px-Anthropic_logo.svg.png' 
  },
  { 
    name: 'perplexity.png', 
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Perplexity_AI_logo.svg/1200px-Perplexity_AI_logo.svg.png' 
  },
  { 
    name: 'elevenlabs.png', 
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/ElevenLabs_Logo.png' 
  }
];

async function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const fileStream = fs.createWriteStream(dest);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
    }).on('error', reject);
  });
}

async function uploadAll() {
  for (const logo of LOGOS) {
    const localPath = path.join(__dirname, logo.name);
    console.log(`Downloading ${logo.name}...`);
    await download(logo.url, localPath);
    
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
    
    // Clean up local file
    fs.unlinkSync(localPath);
  }
  console.log('All logos uploaded to MinIO!');
}

uploadAll().catch(console.error);
