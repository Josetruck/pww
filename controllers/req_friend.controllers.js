const mongoose = require("mongoose");
const Users = require("../models/mysql/users.models")
const Req_friend = require("../models/mysql/req.friend")
const profile = require("../controllers/profiles.controllers");
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
            res.json(true)
        } catch (error) {
            console.log(error)
            res.json(false)
        }
    },
    getUserRequestIn: async(req,res)=>{
        try {
            res.json(await Req_friend.findAll({where: {fk_id_to: req.params.id}}))
        } catch (error) {
            res.json(error)
        }
    },
    getUserRequestOut: async(req,res)=>{
        try {
            res.json(await Req_friend.findAll({where: {fk_id_from: req.params.id}}))
        } catch (error) {
            res.json(error)
        }
    },
    requestResponse: async (req, res)=>{
        try {
            const {id , response} = req.body;
           const request = await Req_friend.update({req_status: response}, {where:{id:id}})  
           const requestInfo = await Req_friend.findByPk(id)
            await profile.addfriend(requestInfo.fk_id_from, requestInfo.fk_id_to) 
            await profile.addfriend(requestInfo.fk_id_to, requestInfo.fk_id_from) 
            res.json(true) 
        } catch (error) {
            console.log(error)
            res.json(false)
        }

    }
}

module.exports = requestf