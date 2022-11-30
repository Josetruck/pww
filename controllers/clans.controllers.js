const Clans = require("../models/mysql/clans.models")
const Users = require("../models/mysql/users.models")
const jwt = require("jsonwebtoken");

const clans = {
    newClan: async (req, res) => {
        var token = req.cookies.infoJwt;
        try {
            let user_data = jwt.verify(token, "m1c4s4")
            console.log(user_data)
            var newClan = await Clans.create({ "clan_name":req.body.clan_name, "creator": user_data.cookie.user_name, "fk_id_faction": req.body.faction })
            console.log("newclan")
            var creator = await Users.update({ "clan_admin": 1, "fk_id_clan":newClan.id, "fk_id_faction":req.body.faction }, { where: { "id": user_data.cookie.id_user } })
            console.log("update")
            res.send("Clan creado correctamente")
        } catch (error) {
            res.send(error)
        }
    },
    deleteClan: (req, res) => {
        const { clan_name } = req.body
    },
    searchClan: async (req,res)=>{
        try {
            res.json(await sequelize.query(`SELECT * FROM clans WHERE clan_name LIKE "%${req.body.user_name}%"`))
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = clans