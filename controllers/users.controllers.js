const Users = require("../models/mysql/users.models")
const profile = require("./profiles.controllers")
const bcyptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");
const sendemail = require("./email.controllers");
const SendmailTransport = require("nodemailer/lib/sendmail-transport");
const sequelize = require("../database/mysql");

const user = {
    register: async (req, res) => {
        try {
            const { user_name, email, pass } = req.body;
            const pass_hash = await bcyptjs.hash(pass, 8);
            const newUser = await Users.create({ user_name, email, "pass": pass_hash });
            await profile.register(req, res, newUser.id)
        } catch (ValidationError) {
            res.send(ValidationError);
        }
    },
    login: async (req, res) => {
        console.log(req.query.url);
        const { input, pass } = req.body;
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (re.test(input)) {
            console.log("Busca por email")
            var userfind = await Users.findOne({ where: { "email": input } });
        } else {
            console.log("Busca por username")
            var userfind = await Users.findOne({ where: { "user_name": input } })
        }
        if (userfind) {
            let hashSaved = userfind.dataValues.pass;
            let cookie = {
                user_name: userfind.dataValues.user_name,
                id_user: userfind.dataValues.id
            }
            let compare = bcyptjs.compareSync(pass, hashSaved);
            const infoJwt = jwt.sign({ cookie }, "m1c4s4", {
                expiresIn: "1800s",
            });
            if (compare) {
                res.cookie("infoJwt", infoJwt);
                res.send("ok");
            } else {
                res.send("no ok");
            }
        } else {
            res.send("no ok");
        }
    },
    getUserData: async (req, res) => {
        try {
            let user_data = await user.getFromCookie(req,res)
            res.json(await Users.findOne({ where: { "id": user_data.id_user } }))
        } catch (error) {
            res.send(error)
        }
    },
    searchUser: async (req,res)=>{
        try {
            res.json(await sequelize.query(`SELECT * FROM users WHERE user_name LIKE "%${req.body.user_name}%"`))
        } catch (error) {
            res.send(error)
        }
    },
    getFromCookie:async (req, res) => {
        try {
            var data = jwt.verify(req.cookies.infoJwt, "m1c4s4")
            return data.cookie
        } catch (error) {
            return {error}
        }
    }
}

module.exports = user