const sharp = require('sharp');
const axios = require('axios');

const MINIO_URL = 'https://assets.streamkart.store/streamkart-assets/slider/ChatGPT%20Image%20May%2021%2C%202026%2C%2007_51_25%20AM.png';

axios.get(MINIO_URL, { responseType: 'arraybuffer' })
    .then(response => {
        const buffer = Buffer.from(response.data);
        return sharp(buffer)
            .raw()
            .toBuffer({ resolveWithObject: true });
    })
    .then(({ data, info }) => {
        const { width, height, channels } = info;
        
        // Let's find the bounding box of the bright/white content (logos, text, illustrations)
        // Bright pixel threshold: r > 100 && g > 100 && b > 100
        let minX = width, maxX = 0;
        let minY = height, maxY = 0;
        
        // We only scan inside the card area to avoid any off-white margins
        for (let y = 50; y < height - 50; y++) {
            for (let x = 50; x < width - 50; x++) {
                const idx = (y * width + x) * channels;
                const r = data[idx];
                const g = data[idx+1];
                const b = data[idx+2];
                
                if (r > 120 && g > 120 && b > 120) {
                    if (x < minX) minX = x;
                    if (x > maxX) maxX = x;
                    if (y < minY) minY = y;
                    if (y > maxY) maxY = y;
                }
            }
        }
        
        console.log('Bright Content Bounding Box:');
        console.log(`MinX: ${minX}, MaxX: ${maxX}, Width: ${maxX - minX}`);
        console.log(`MinY: ${minY}, MaxY: ${maxY}, Height: ${maxY - minY}`);
    })
    .catch(err => console.error(err));
