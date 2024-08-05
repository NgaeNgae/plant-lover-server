const fs = require('fs')
const path = require('path')
const uploadImage = (files) => {
    const imageDirectory = `${path.join(__dirname,`../storage/images`)}`;
        if (!fs.existsSync(imageDirectory)) {
            fs.mkdirSync(imageDirectory);
    }
    if(files.constructor === Array) {
        let images = [];
        files.forEach(file => {
            const fileName = new Date().valueOf()+"_"+file.name;
            file.mv(`./storage/images/${fileName}`);
            images.push(fileName);
        })
        return images;
    }else {
        const fileName = new Date().valueOf()+"_"+files.name;
        files.mv(`./storage/images/${fileName}`);
        return fileName;
    }
}
const dropImage = (images) => {
    if(images.constructor === Array) {
        images.forEach(image => {
            fs.unlinkSync(`./storage/images/${image}`);
        });
    }else {
        fs.unlinkSync(`./storage/images/${images}`);
    }
}

module.exports = {dropImage, uploadImage}