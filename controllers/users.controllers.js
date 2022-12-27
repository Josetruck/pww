const Users = require("../models/mysql/users.models")
const profile = require("./profiles.controllers")
const bcyptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");
const sendemail = require("./email.controllers");
const { Op } = require("sequelize")

const user = {
    register: async (req, res) => {
        try {
            const { user_name, email, pass } = req.body;
            const pass_hash = await bcyptjs.hash(pass, 8);
            const newUser = await Users.create({ user_name, email, "pass": pass_hash });
            await profile.register(req, res, newUser.id)
            const infoJwt = jwt.sign({ email }, "m1c4s4", {
                expiresIn: "1000s",
            });
            let cookie = {
                user_name: newUser.dataValues.user_name,
                id_user: newUser.dataValues.id
            }
            const sessionJwt = jwt.sign({ cookie }, "m1c4s4");
            sendemail.emailToRegister(infoJwt, email)
            res.json({ cookie: sessionJwt })
        } catch (error) {
            res.json(error);
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
            const infoJwt = jwt.sign({ cookie }, "m1c4s4");
            if (compare) {
                res.cookie("session", infoJwt)
                res.json({ cookie: infoJwt });
            } else {
                res.json(false);
            }
        } else {
            res.json(false);
        }
    },
    getUserData: async (req, res) => {
        try {
            let user_data = await user.getFromCookie(req)
            console.log(user_data)
            const userFinded = await Users.findOne({ where: { id: user_data.id_user } })
            console.log(userFinded)
            res.json(userFinded.dataValues)
        } catch (error) {
            res.send(error)
        }
    },
    searchUser: async (req, res) => {
        try {
            res.json(await Users.findAll({ attributes: ["id", "user_name", "email", "total_distance", "this_week_distance", "clan_admin", "fk_id_clan", "fk_id_faction"] }, { where: { user_name: { [Op.like]: `%${req.body.user_name}%` } } }))
        } catch (error) {
            res.send(error)
        }
    },
    searchAvaliableUser: async (req, res) => {
        try {
            const avaliable = await Users.findOne({ where: { user_name: req.body.user_name } })
            console.log(avaliable)
            if (avaliable) {
                res.json({ avaliable: false })
            } else { res.json({ avaliable: true }) }

        } catch (error) {
            res.json(error)
        }
    },
    getFromCookie: async (req) => {
        try {
            console.log(req.cookies)
            var data = jwt.verify(req.cookies.session, "m1c4s4")
            console.log(data)
            return data.cookie
        } catch (error) {
            return { error }
        }
    },
    emailExists: async (req, res) => {
        try {
            const userf = await Users.findOne({ where: { email: req.params.email } })
            if (userf) {
                res.json(true)
            } else {
                res.json(false)
            }
        } catch (error) {
            console.log(error)
            res.json(false)
        }
    },
    /**
 * Envia al email un enlace de acceso al registro.
 * @param {json} req 
 * @param {json} res 
 */
    confirmEmail: async (req, res) => {
        try {
            const { email } = req.body;
            const infoJwt = jwt.sign({ email }, "m1c4s4", {
                expiresIn: "1000s",
            });
            await sendemail.emailToRegister(infoJwt, email);
            res.json(`Email enviado a ${email}`);
        } catch (error) {
            res.json(error)
        }
    },
    passRecovery: async (req, res) => {
        const { email } = req.body;
        const infoUser = await Users.findOne({ where: { "email": req.body.email } });
        if (infoUser) {
            const infoJwt = jwt.sign({ email }, "m1c4s4", {
                expiresIn: "1000s",
            });
            sendemail.passrequest(infoJwt, email);
            res.json(infoJwt);
        } else {
            res.json(false);
        }
    },
    passReset: async (req, res) => {
        let { token, password } = req.body;
        try {
            // Verifica el token donde está el email del usuario
            let jwtVerify = jwt.verify(token, "m1c4s4");
            let email = jwtVerify.email;
            var user_password = await bcyptjs.hash(password, 8);
            const infoUser = await Users.update({ user_password }, { where: { email } });
            const infoUser2 = await Users.findOne({ where: { email } })
            sendemail.passconfirm(email);
            let cookie = {
                user_name: infoUser2.dataValues.user_name,
                id_user: infoUser2.dataValues.id
            }
            const infoJwt = jwt.sign({ cookie }, "m1c4s4");
            res.cookie("session", infoJwt)
            res.json({ cookie: infoJwt });
        } catch (error) {
            res.json(error)
        }
    },
}

module.exports = user