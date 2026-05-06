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

const domains = [
  { id: 'netflix', domain: 'netflix.com' },
  { id: 'prime', domain: 'amazon.com' },
  { id: 'hotstar', domain: 'hotstar.com' },
  { id: 'zee5', domain: 'zee5.com' },
  { id: 'sonyliv', domain: 'sonyliv.com' },
  { id: 'chaupal', domain: 'chaupal.tv' },
  { id: 'youtube', domain: 'youtube.com' },
  { id: 'disney', domain: 'disneyplus.com' },
  { id: 'crunchyroll', domain: 'crunchyroll.com' },
  { id: 'hbomax', domain: 'hbomax.com' },
  { id: 'jiosaavn', domain: 'jiosaavn.com' },
  { id: 'spotify', domain: 'spotify.com' },
];

async function uploadLogo(item) {
  try {
    const url = `https://cdn.brandfetch.io/${item.domain}/w/400/h/400`;
    const res = await axios.get(url, { responseType: 'arraybuffer' });
    const key = `logos/${item.id}.png`;
    
    await client.send(new PutObjectCommand({
      Bucket: 'streamkart-assets',
      Key: key,
      Body: res.data,
      ContentType: 'image/png',
      ACL: 'public-read'
    }));
    console.log(`Uploaded ${key}`);
  } catch (err) {
    console.error(`Failed for ${item.id}`, err.message);
  }
}

async function run() {
  for (const item of domains) {
    await uploadLogo(item);
  }
}
run();
