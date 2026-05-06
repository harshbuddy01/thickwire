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
  { name: 'chatgpt.png', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1200px-ChatGPT_logo.svg.png' },
  { name: 'gemini.png', url: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-gemini-icon.png' },
  { name: 'copilot.png', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Microsoft_Copilot_logo.svg/1200px-Microsoft_Copilot_logo.svg.png' },
  { name: 'midjourney.png', url: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Midjourney_Emblem.png' },
  { name: 'notion.png', url: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png' },
  { name: 'claude.png', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Anthropic_logo.svg/1200px-Anthropic_logo.svg.png' },
  { name: 'perplexity.png', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Perplexity_AI_logo.svg/1200px-Perplexity_AI_logo.svg.png' },
  { name: 'elevenlabs.png', url: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/ElevenLabs_Logo.png' }
];

async function uploadAll() {
  for (const logo of LOGOS) {
    const localPath = path.join(__dirname, logo.name);
    
    try {
      console.log(`Downloading ${logo.name} using curl...`);
      // Using a User-Agent to avoid being blocked by Wikipedia/other sites
      execSync(`curl -L -A "Mozilla/5.0" -o "${localPath}" "${logo.url}"`);
      
      const stats = fs.statSync(localPath);
      console.log(`${logo.name} size: ${stats.size} bytes`);
      
      if (stats.size < 1000) {
        console.error(`Warning: ${logo.name} is very small, might be an error page.`);
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
