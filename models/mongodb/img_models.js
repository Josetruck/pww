const { Int32 } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 


let imgSchema= new Schema({
  
    id_user: String,
    location: String,
    date: String,
    url: String,
    likes:Int32,
    coments: [{ id_user: String, date: String, text: String,}]
});
 
const imagesModel = mongoose.model("images", imgSchema);
module.exports = imagesModel;