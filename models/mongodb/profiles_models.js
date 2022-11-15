const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 


let profileSchema= new Schema({
  
    reg_date: Date,
    id_user: String,
    firstname: String,
    lastname: String,
    birth_date: String,
    phone_number: String,
    location: String,
    postal_code: String,
    friend_list: Array

});
 
const profilesModel = mongoose.model("profiles", profileSchema);
module.exports = profilesModel;