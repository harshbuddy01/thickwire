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
  // Netflix - JUST the N icon (square icon, not the wordmark)
  { id: 'netflix', url: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Netflix_2015_N_logo.svg' },
  // Prime Video - square icon version
  { id: 'prime', url: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Amazon_Prime_Video_logo.svg' },
  // YouTube - the red play button icon (NOT YouTube Premium)
  { id: 'youtube', url: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg' },
  // Disney+ Hotstar - proper logo
  { id: 'hotstar', url: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Disney%2B_Hotstar_logo.svg' },
  // Disney+ - just the Disney+ logo
  { id: 'disney', url: 'https://cdn.brandfetch.io/disneyplus.com/w/512/h/512' },
  // Spotify - the iconic green circle logo (not text)
  { id: 'spotify', url: 'https://cdn.brandfetch.io/spotify.com/w/512/h/512' },
  // Crunchyroll 
  { id: 'crunchyroll', url: 'https://cdn.brandfetch.io/crunchyroll.com/w/512/h/512' },
  // HBO Max
  { id: 'hbomax', url: 'https://cdn.brandfetch.io/hbomax.com/w/512/h/512' },
  // JioSaavn
  { id: 'jiosaavn', url: 'https://cdn.brandfetch.io/jiosaavn.com/w/512/h/512' },
  // ZEE5
  { id: 'zee5', url: 'https://cdn.brandfetch.io/zee5.com/w/512/h/512' },
  // SonyLIV
  { id: 'sonyliv', url: 'https://cdn.brandfetch.io/sonyliv.com/w/512/h/512' },
  // Chaupal
  { id: 'chaupal', url: 'https://cdn.brandfetch.io/chaupal.tv/w/512/h/512' },
];

async function upload(item) {
  try {
    const res = await axios.get(item.url, {
      responseType: 'arraybuffer',
      timeout: 10000,
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const ct = res.headers['content-type'] || 'image/png';
    const ext = ct.includes('svg') ? 'svg' : 'png';
    const key = `logos/${item.id}.${ext}`;
    await client.send(new PutObjectCommand({
      Bucket: 'streamkart-assets',
      Key: key,
      Body: res.data,
      ContentType: ct
    }));
    console.log(`✅ Uploaded ${key}`);
    return { id: item.id, key };
  } catch (err) {
    console.error(`❌ Failed ${item.id}: ${err.message}`);
    return null;
  }
}

(async () => {
  for (const logo of logos) await upload(logo);
})();
