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
  { id: 'netflix', url: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
  { id: 'prime', url: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Amazon_Prime_Video_logo.svg' },
  { id: 'hotstar', url: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Disney%2B_Hotstar_logo.svg' },
  { id: 'zee5', url: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Zee5_Official_logo.svg' },
  { id: 'sonyliv', url: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Sony_LIV_logo.svg' },
  { id: 'chaupal', url: 'https://cdn.worldvectorlogo.com/logos/youtube-3.svg' }, // using a placeholder if needed, or I'll just use a direct link later
  { id: 'youtube', url: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/YouTube_Premium_logo.svg' },
  { id: 'disney', url: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg' },
  { id: 'crunchyroll', url: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Crunchyroll_Logo.png' },
  { id: 'hbomax', url: 'https://upload.wikimedia.org/wikipedia/commons/1/17/HBO_Max_Logo.svg' },
  { id: 'jiosaavn', url: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Jiosaavn-logo-300x300.png' },
  { id: 'spotify', url: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg' }
];

async function uploadLogo(item) {
  try {
    const res = await axios.get(item.url, { 
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
      }
    });
    const contentType = res.headers['content-type'] || 'image/svg+xml';
    const key = `logos/${item.id}.${contentType.includes('svg') ? 'svg' : 'png'}`;
    
    await client.send(new PutObjectCommand({
      Bucket: 'streamkart-assets',
      Key: key,
      Body: res.data,
      ContentType: contentType,
      ACL: 'public-read'
    }));
    console.log(`Uploaded ${key}`);
    return key;
  } catch (err) {
    console.error(`Failed for ${item.id}`);
    return null;
  }
}

async function run() {
  for (const item of domains) {
    await uploadLogo(item);
  }
}
run();
