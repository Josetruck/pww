const mongoose = require("mongoose");
const Users = require("../models/mysql/users.models")
const Req_friend = require("../models/mysql/req.friend")
const Profile = require("../models/mongodb/profiles.models");
const user=require("../controllers/users.controllers")
const url = `mongodb://127.0.0.1:27017/pww`;


/* try {
    await mongoose.connect(url).catch(error => handleError(error));   
} catch (error) {
    res.json(error)
} finally {
    await mongoose.connection.close()
} */

const requestf = {
    newRequest: async (req,res)=>{
        try {
            const {id_from, id_to} = req.body;
            console.log(req.body)
            const requested = await Req_friend.create({fk_id_from: id_from, fk_id_to: id_to})
            console.log(requested)
            res.json(true)
        } catch (error) {
            console.log(error)
            res.json(false)
        }
    }
}

module.exports = requestf