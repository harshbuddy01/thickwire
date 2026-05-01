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

const logos = [
  { id: 'netflix', url: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Netflix-new-icon.png', ct: 'image/png' },
  { id: 'prime', url: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Amazon_Prime_Video_logo.svg', ct: 'image/svg+xml' },
  { id: 'hotstar', url: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Disney%2B_Hotstar_logo.svg', ct: 'image/svg+xml' },
  { id: 'zee5', url: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Zee5_Official_logo.svg', ct: 'image/svg+xml' },
  { id: 'sonyliv', url: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Sony_LIV_logo.svg', ct: 'image/svg+xml' },
  { id: 'chaupal', url: 'https://cdn.brandfetch.io/chaupal.tv/w/512/h/512', ct: 'image/png' },
  { id: 'youtube', url: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg', ct: 'image/svg+xml' },
  { id: 'disney', url: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg', ct: 'image/svg+xml' },
  { id: 'crunchyroll', url: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Crunchyroll_Logo.png', ct: 'image/png' },
  { id: 'hbomax', url: 'https://upload.wikimedia.org/wikipedia/commons/1/17/HBO_Max_Logo.svg', ct: 'image/svg+xml' },
  { id: 'jiosaavn', url: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Jiosaavn-logo-300x300.png', ct: 'image/png' },
  { id: 'spotify', url: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_with_text.svg', ct: 'image/svg+xml' },
];

async function uploadLogo(item) {
  try {
    const res = await axios.get(item.url, { responseType: 'arraybuffer' });
    const ext = item.ct.split('/')[1].split('+')[0];
    const key = `logos/${item.id}.${ext}`;
    
    await client.send(new PutObjectCommand({
      Bucket: 'streamkart-assets',
      Key: key,
      Body: res.data,
      ContentType: item.ct,
      ACL: 'public-read'
    }));
    console.log(`Uploaded ${key} (${item.ct})`);
  } catch (err) {
    console.error(`Failed for ${item.id}`, err.message);
  }
}

async function run() {
  for (const item of logos) {
    await uploadLogo(item);
  }
}
run();
