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
    name: 'chatgpt.png', 
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1200px-ChatGPT_logo.svg.png' 
  },
  { 
    name: 'gemini.png', 
    url: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-gemini-icon.png' 
  },
  { 
    name: 'copilot.png', 
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Microsoft_Copilot_logo.svg/1200px-Microsoft_Copilot_logo.svg.png' 
  },
  { 
    name: 'midjourney.png', 
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Midjourney_Emblem.png' 
  },
  { 
    name: 'notion.png', 
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png' 
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
