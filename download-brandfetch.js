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
  { id: 'zee5', url: 'https://cdn.brandfetch.io/zee5.com/w/400/h/400' },
  { id: 'sonyliv', url: 'https://cdn.brandfetch.io/sonyliv.com/w/400/h/400' },
  { id: 'chaupal', url: 'https://cdn.brandfetch.io/chaupal.tv/w/400/h/400' },
  { id: 'disney', url: 'https://cdn.brandfetch.io/disneyplus.com/w/400/h/400' },
  { id: 'crunchyroll', url: 'https://cdn.brandfetch.io/crunchyroll.com/w/400/h/400' },
  { id: 'hbomax', url: 'https://cdn.brandfetch.io/hbomax.com/w/400/h/400' },
  { id: 'jiosaavn', url: 'https://cdn.brandfetch.io/jiosaavn.com/w/400/h/400' },
  { id: 'spotify', url: 'https://cdn.brandfetch.io/spotify.com/w/400/h/400' }
];

async function uploadLogo(item) {
  try {
    const res = await axios.get(item.url, { responseType: 'arraybuffer' });
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
