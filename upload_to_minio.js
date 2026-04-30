const Minio = require('minio');
const fs = require('fs');
const path = require('path');

const minioClient = new Minio.Client({
    endPoint: 'bucket-production-6fef.up.railway.app',
    port: 443,
    useSSL: true,
    accessKey: '7GdPHwwaCowmEMnHGWN8cxTGLPJlLKXt',
    secretKey: 'Xemvj9jCRukmm2eKrfOte5a0kIggdfEBj9XseiOxk2Di8s0R'
});

const bucketName = 'streamkart-assets';

const policy = {
    Version: "2012-10-17",
    Statement: [
        {
            Effect: "Allow",
            Principal: { AWS: ["*"] },
            Action: ["s3:GetObject"],
            Resource: [`arn:aws:s3:::${bucketName}/*`]
        }
    ]
};

async function uploadImages() {
    try {
        // Set Bucket Policy
        console.log('Setting public policy for bucket...');
        await minioClient.setBucketPolicy(bucketName, JSON.stringify(policy));
        console.log('Policy set to public read.');

        const imagesDir = path.join(__dirname, 'public/images');
        
        function getFiles(dir, fileList = []) {
            const files = fs.readdirSync(dir);
            for (const file of files) {
                const stat = fs.statSync(path.join(dir, file));
                if (stat.isDirectory()) {
                    fileList = getFiles(path.join(dir, file), fileList);
                } else if (!file.startsWith('.')) {
                    fileList.push(path.join(dir, file));
                }
            }
            return fileList;
        }

        const files = getFiles(imagesDir);
        console.log(`Found ${files.length} files to upload.`);

        for (const file of files) {
            const objectName = path.relative(imagesDir, file).replace(/\\/g, '/');
            console.log(`Uploading ${objectName}...`);
            await minioClient.fPutObject(bucketName, objectName, file);
        }
        
        console.log('All files uploaded successfully!');
    } catch (e) {
        console.error('Error:', e);
    }
}

uploadImages();
