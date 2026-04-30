const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const imagesDir = path.join(__dirname, 'public/images');
const srcDir = path.join(__dirname, 'src');

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

const allImages = getFiles(imagesDir);
const unusedImages = [];

for (const image of allImages) {
    const relPath = path.relative(imagesDir, image);
    const basename = path.basename(image);
    
    try {
        // Search for the basename in the src directory
        execSync(`grep -r "${basename}" "${srcDir}"`);
    } catch (e) {
        // grep returns non-zero exit code if not found
        unusedImages.push(relPath);
    }
}

console.log(JSON.stringify(unusedImages, null, 2));
