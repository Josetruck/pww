var ObjectId = require('mongodb').ObjectId;


const image = {
    upload: (req, res) => {
        console.log(req.file.filename)
        if (req.file) {
            res.send("Single file uploaded successfully");
        } else {
            res.status(400).send("Please upload a valid image");
        }
    }
}

module.exports = image
