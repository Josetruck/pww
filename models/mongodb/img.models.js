
const mongoose = require("mongoose")
const Schema = mongoose.Schema;

let imgSchema = new Schema({

    id_user: String,
    location: Array,
    title: String,
    date: String,
    url: String,
    likes: Number,
    coments: [{ id_user: String, user_name: String, date: String, text: String, }]
});

const imagesModel = mongoose.model("images", imgSchema);
module.exports = imagesModel;