const fs = require('fs');
const path = require('path');

exports.handler = async () => {
    const imagesDir = path.join(__dirname, '..', 'public', 'images');
    const files = fs.readdirSync(imagesDir);
    const images = files.filter(file => /\.(jpg|jpeg|png|gif)$/.test(file));
    return {
        statusCode: 200,
        body: JSON.stringify(images),
    };
};
