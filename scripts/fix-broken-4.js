const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const client = new S3Client({
  endpoint: 'https://bucket-production-6fef.up.railway.app',
  region: 'us-east-1',
  credentials: {
    accessKeyId: '7GdPHwwaCowmEMnHGWN8cxTGLPJlLKXt',
    secretAccessKey: 'Xemvj9jCRukmm2eKrfOte5a0kIggdfEBj9XseiOxk2Di8s0R'
  },
  forcePathStyle: true
});

// 1. Netflix N icon — exact red N lettermark with proper shadow/gradient
const netflixN = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
  <rect width="1024" height="1024" rx="200" fill="#E50914"/>
  <g transform="translate(250, 150)">
    <path d="M0 0h130v724H0z" fill="#fff"/>
    <path d="M0 0l262 724h130V0H262z" fill="#fff"/>
    <path d="M262 0h130v724H262z" fill="#fff"/>
    <path d="M0 0l262 724h130L130 0z" fill="url(#ng)"/>
    <defs>
      <linearGradient id="ng" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#B1060F"/>
        <stop offset="1" stop-color="#E50914" stop-opacity="0"/>
      </linearGradient>
    </defs>
  </g>
</svg>`;

// 2. Prime Video — teal play button with "prime video" text on dark blue
const primeVideo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="100" fill="#00253F"/>
  <g transform="translate(80, 120)">
    <text font-family="Amazon Ember, Arial, Helvetica, sans-serif" font-size="95" font-weight="300" fill="#fff" y="0">prime</text>
    <text font-family="Amazon Ember, Arial, Helvetica, sans-serif" font-size="95" font-weight="700" fill="#fff" y="105">video</text>
  </g>
  <path d="M100 400 Q256 450 412 400" stroke="#1EBBEE" stroke-width="12" fill="none" stroke-linecap="round"/>
  <polygon points="350,200 350,280 400,240" fill="#1EBBEE"/>
</svg>`;

// 3. Disney+ Hotstar — clean text-based logo
const hotstar = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="100" fill="#0C1B3A"/>
  <g transform="translate(50, 140)">
    <text font-family="Arial, Helvetica, sans-serif" font-size="62" font-weight="900" fill="#fff">
      <tspan x="0" y="0">Disney+</tspan>
      <tspan x="0" y="80" font-size="70" fill="#1F80E0">Hotstar</tspan>
    </text>
  </g>
  <text x="256" y="370" text-anchor="middle" font-family="Arial" font-size="26" fill="rgba(255,255,255,0.5)">Premium</text>
</svg>`;

// 4. Chaupal — golden/brown text logo  
const chaupal = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="100" fill="#1A1200"/>
  <text x="256" y="240" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-size="72" font-weight="900" fill="#F5A623" letter-spacing="4">CHAUPAL</text>
  <text x="256" y="310" text-anchor="middle" font-family="Arial, sans-serif" font-size="30" fill="rgba(245,166,35,0.6)">Streaming</text>
</svg>`;

async function upload(key, content) {
  await client.send(new PutObjectCommand({
    Bucket: 'streamkart-assets',
    Key: key,
    Body: Buffer.from(content),
    ContentType: 'image/svg+xml'
  }));
  console.log('✅ ' + key);
}

(async () => {
  await upload('logos/netflix.svg', netflixN);
  await upload('logos/prime.svg', primeVideo);
  await upload('logos/hotstar.svg', hotstar);
  await upload('logos/chaupal.svg', chaupal);
  console.log('Done — all 4 broken logos fixed');
})();
