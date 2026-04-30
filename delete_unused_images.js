const Minio = require('minio');
const fs = require('fs');
const path = require('path');

const unusedImages = [
  "mockup.jpg",
  "netflix_banner_user.png",
  "netflix_page_user.png",
  "new_images/file_00000000458c71fa961df6bd20c8a3e6.png",
  "new_images/file_00000000574471fa8e2cf2aaa9933588.png",
  "new_images/file_00000000630871fa87703bb11b1834de.png",
  "new_images/file_000000006c187207a066a0721660e2c5.png",
  "new_images/file_0000000071d871fa84cdd5bf635fc695.png",
  "new_images/file_0000000077b472079ce4b3372a027bb1.png",
  "new_images/file_000000007e9071fa9bd8a9ca81a4425e.png",
  "new_images/file_00000000dec471fa94cdee922bc1a0c9.png",
  "new_images/file_00000000f1d071fa97d1fc4af3488eec.png",
  "slider/extraction.jpg",
  "slider/familyman.jpg",
  "slider/ipl.jpg",
  "slider/netflix_exact.png",
  "slider/uefa.jpg"
];

const minioClient = new Minio.Client({
    endPoint: 'bucket-production-6fef.up.railway.app',
    port: 443,
    useSSL: true,
    accessKey: '7GdPHwwaCowmEMnHGWN8cxTGLPJlLKXt',
    secretKey: 'Xemvj9jCRukmm2eKrfOte5a0kIggdfEBj9XseiOxk2Di8s0R'
});

const bucketName = 'streamkart-assets';
const imagesDir = path.join(__dirname, 'public/images');

async function deleteImages() {
    try {
        console.log('Deleting unused images from MinIO...');
        for (const img of unusedImages) {
            await minioClient.removeObject(bucketName, img);
            console.log(`Deleted from MinIO: ${img}`);
            
            const localPath = path.join(imagesDir, img);
            if (fs.existsSync(localPath)) {
                fs.unlinkSync(localPath);
                console.log(`Deleted locally: ${img}`);
            }
        }
        
        // Also try to delete the new_images directory if it's empty
        const newImagesDir = path.join(imagesDir, 'new_images');
        if (fs.existsSync(newImagesDir)) {
            if (fs.readdirSync(newImagesDir).length === 0) {
                fs.rmdirSync(newImagesDir);
                console.log('Deleted empty directory: new_images');
            }
        }
        
        console.log('Cleanup complete!');
    } catch (e) {
        console.error('Error:', e);
    }
}

deleteImages();
