const fs = require('fs');

const files = [
    'src/app/signup/page.tsx',
    'src/app/checkout/page.tsx',
    'src/app/streaming/page.tsx',
    'src/app/support/page.tsx',
    'src/app/account/page.tsx',
    'src/app/page.tsx',
    'src/app/login/page.tsx',
    'src/app/services/spotify/SpotifyPageClient.tsx',
    'src/app/services/youtube/YoutubePageClient.tsx',
    'src/app/services/netflix/NetflixPageClient.tsx',
    'src/app/services/hbo/HboPageClient.tsx',
    'src/app/services/prime/PrimePageClient.tsx',
    'src/components/Footer.tsx',
    'src/components/Header.tsx',
    'src/components/HeroSlider.tsx'
];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/';\\nimport styles/g, "';\nimport styles");
    content = content.replace(/";\\nimport styles/g, '";\nimport styles');
    fs.writeFileSync(file, content);
});
console.log('Fixed literal newlines');
