const Images = require("../models/mongodb/img.models")
const mongoose = require("mongoose");
const url = `mongodb://127.0.0.1:27017/pww`;

const image = {
    insert: async (req, res) => {
        await mongoose.connect(url).catch(error => handleError(error));
        try {
            const { location, date, url, id_user } = req.body
            console.log(req.body)
            await Images.create({ id_user, location, date, url })
            res.json("ok")
        } catch (error) {
            res.json(error)
        } finally {
            await mongoose.connection.close();
        }

    }
}

module.exports = image
