const fs = require('fs');
const glob = require('glob'); // Note: we'll just read the files from the array instead of using glob to avoid dependencies

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
    const lines = content.split('\n');
    let stylesImportFound = false;
    
    const newLines = lines.filter(line => {
        if (line.includes('import styles from')) {
            if (stylesImportFound) {
                return false; // Skip duplicate
            } else {
                stylesImportFound = true;
                return true; // Keep first
            }
        }
        return true;
    });
    
    fs.writeFileSync(file, newLines.join('\n'));
});
console.log('Fixed duplicate imports');
