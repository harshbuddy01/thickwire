const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const axios = require('axios');

const client = new S3Client({
  endpoint: 'https://bucket-production-6fef.up.railway.app',
  region: 'us-east-1',
  credentials: {
    accessKeyId: '7GdPHwwaCowmEMnHGWN8cxTGLPJlLKXt',
    secretAccessKey: 'Xemvj9jCRukmm2eKrfOte5a0kIggdfEBj9XseiOxk2Di8s0R'
  },
  forcePathStyle: true
});

const services = [
  { name: 'capcut', domain: 'capcut.com' },
  { name: 'canva', domain: 'canva.com' },
  { name: 'duolingo', domain: 'duolingo.com' },
  { name: 'edx', domain: 'edx.org' },
  { name: 'perplexity', domain: 'perplexity.ai' },
  { name: 'tradingview', domain: 'tradingview.com' },
  { name: 'adobe', domain: 'adobe.com' },
  { name: 'linkedin', domain: 'linkedin.com' },
  { name: 'windows', domain: 'microsoft.com' },
  { name: 'office', domain: 'office.com' },
  { name: 'gcp', domain: 'cloud.google.com' },
  { name: 'chatgpt', domain: 'openai.com' }
];

async function downloadAndUpload() {
  for (const service of services) {
    try {
      // Using DuckDuckGo icons as fallback for PNGs if Clearbit is down
      const url = `https://icons.duckduckgo.com/ip3/${service.domain}.ico`;
      // Actually, let's use the google one with high size
      const gUrl = `https://www.google.com/s2/favicons?domain=${service.domain}&sz=128`;
      
      console.log(`Downloading ${service.name} logo from ${gUrl}...`);
      const response = await axios.get(gUrl, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data);
      
      const key = `logos/${service.name}.png`;
      await client.send(new PutObjectCommand({
        Bucket: 'streamkart-assets',
        Key: key,
        Body: buffer,
        ContentType: 'image/png'
      }));
      
      console.log(`Successfully uploaded ${service.name} logo to ${key}`);
    } catch (err) {
      console.error(`Failed to process ${service.name}: ${err.message}`);
    }
  }
}

downloadAndUpload();
