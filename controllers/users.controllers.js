const Users = require("../models/mysql/users.models")
const profile = require("./profiles.controllers")
const bcyptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");
const sendemail = require("./email.controllers");
const { Op } = require("sequelize");

require('dotenv').config();

const user = {
    /**
     * Inserta en las bases de datos (MySQL y MongoDB) los datos del usuario. Envia un email de confirmación al usuario.
     * @param {JSON} req 
     * @param {JSON} res 
     */
    register: async (req, res) => {
        try {
            const { user_name, email, pass } = req.body;

            //encriptamos la contraseña para guardar en la base de datos.
            const pass_hash = await bcyptjs.hash(pass, 8);
            const newUser = await Users.create({ user_name, email, "pass": pass_hash });

            //con la id del usuario que acabamos de crear, hacemos una inserción en MongoDB con el resto de datos de registro. (req.body)
            await profile.register(req, res, newUser.id)

            //Creamos un Json Web Token para enviar en el email de confirmación para hacer la verificación.
            const infoJwt = jwt.sign({ email }, process.env.WEB_TOKEN_SECRET);
            let cookie = {
                user_name: newUser.dataValues.user_name,
                id_user: newUser.dataValues.id
            }
            //Creamos un Json Web Token para guardar en una cookie la información de sesión del usuario para que directamente acceda a la aplicación.
            const sessionJwt = jwt.sign({ cookie }, process.env.WEB_TOKEN_SECRET);
            sendemail.emailToRegister(infoJwt, email)
            res.json({ cookie: sessionJwt })
        } catch (error) {
            res.json(error);
        }
    },

    /**
     * Función que comprueba las credenciales de inicio de sesión. Permite el inicio de sesión mediante user_name o email.
     * @param {JSON} req 
     * @param {JSON} res 
     */
    login: async (req, res) => {
        const { input, pass } = req.body;

        //Expresión regular que identifica si la entrada es un email.
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        //Consultamos la información del usuario para comparar la contraseña guardada con la introducida en el formulario.
        if (re.test(input)) {
            var userfind = await Users.findOne({ where: { "email": input } });
        } else {
            var userfind = await Users.findOne({ where: { "user_name": input } })
        }
        if (userfind) {
            let hashSaved = userfind.dataValues.pass;
            let cookie = {
                user_name: userfind.dataValues.user_name,
                id_user: userfind.dataValues.id
            }
            //Compara la contraseña guardada desencriptandola con la introducida en el formulario.
            let compare = bcyptjs.compareSync(pass, hashSaved);
            const infoJwt = jwt.sign({ cookie }, process.env.WEB_TOKEN_SECRET);
            if (compare) {
                res.json({ cookie: infoJwt });
            } else {
                res.json(false);
            }
        } else {
            res.json(false);
        }
    },

    /**
     * Responde con un objeto creado con los datos guardados en MySQL y en MongoDB. La id se obtiene de la cookie con la información de sesión.
     * @param {JSON} req 
     * @param {JSON} res 
     */
    getUserData: async (req, res) => {
        try {
            let user_data = await user.getFromCookie(req)
            const userFinded = await Users.findByPk(user_data.id_user, { attributes: ["id", "user_name", "email", "total_distance", "this_week_distance", "clan_admin", "fk_id_clan", "fk_id_faction"] })
            const profileFinded = await profile.getById(user_data.id_user)
            const user_datavalues = userFinded.dataValues

            //Crea un objeto a partir de las dos consultas.
            const userData = Object.assign({}, user_datavalues, profileFinded)
            res.json(userData)
        } catch (error) {
            res.send(error)
        }
    },

    /**
     * Responde con un objeto con toda la información del usuario buscando por su ID.
     * @param {JSON} req req.params.id = "INTEGER"
     * @param {JSON} res 
     */
    getUserById: async (req, res) => {
        try {
            const userFinded = await Users.findByPk(req.params.id, { attributes: ["id", "user_name", "email", "total_distance", "this_week_distance", "clan_admin", "fk_id_clan", "fk_id_faction"] })
            const profileFinded = await profile.getById(req.params.id)
            const user_datavalues = userFinded.dataValues
            const userData = Object.assign({}, user_datavalues, profileFinded)
            console.log(userData)
            res.json(userData)
        } catch (error) {
            res.send(error)
        }
    },
    /**
     * Responde con una lista de usuarios según el user_name.
     * @param {JSON} req 
     * @param {JSON} res 
     */
    searchUser: async (req, res) => {
        try {
            res.json(await Users.findAll({ where: { user_name: { [Op.like]: `%${req.body.user_name}%` }, id: { [Op.ne]: req.body.id_user } } }))
        } catch (error) {
            res.send(error)
        }
    },
    /**
     * Responde con un booleano en el caso de que un user_name esté en uso.
     * @param {JSON} req 
     * @param {JSON} res 
     */
    searchAvaliableUser: async (req, res) => {
        try {
            const avaliable = await Users.findOne({ where: { user_name: req.body.user_name } })

            if (avaliable) {
                res.json({ avaliable: false })
            } else { res.json({ avaliable: true }) }

        } catch (error) {
            res.json(error)
        }
    },
    /**
     * Función para el back-end.
     * @param {JSON} req 
     * @returns Id del usuario que se guarda en las cookies.
     */
    getFromCookie: async (req) => {
        try {
            var data = jwt.verify(req.cookies.session, process.env.WEB_TOKEN_SECRET)
            return data.cookie
        } catch (error) {
            return { error }
        }
    },
    /**
     * Funcion que responde con un booleano en caso de que un email esté en uso.
     * @param {JSON} req 
     * @param {JSON} res 
     */
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
        console.log(req.body)
        try {
            var email = jwt.verify(req.body.jwt , process.env.WEB_TOKEN_SECRET)
            console.log(email)
            res.json(true);
        } catch (error) {
            console.log(error)
            res.json(error)
        }
    },
    /**
     * Envia un email que da acceso al formulario de restablecimiento de la contraseña.
     * @param {JSON} req 
     * @param {JSON} res 
     */
    passRecovery: async (req, res) => {
        const { email } = req.body;
        const infoUser = await Users.findOne({ where: { "email": req.body.email } });
        if (infoUser) {
            const infoJwt = jwt.sign({ email }, process.env.WEB_TOKEN_SECRET, {
                expiresIn: "1000s",
            });
            sendemail.passrequest(infoJwt, email);
            res.json(infoJwt);
        } else {
            res.json(false);
        }
    },
    /**
     * Función que actualiza el campo de la contraseña en MySQL.
     * @param {JSON} req 
     * @param {JSON} res 
     */
    passReset: async (req, res) => {
        let { token, password } = req.body;
        try {
            // Verifica el token donde está el email del usuario
            let jwtVerify = jwt.verify(token, process.env.WEB_TOKEN_SECRET);
            let email = jwtVerify.email;
            var user_password = await bcyptjs.hash(password, 8);
            const infoUser = await Users.update({ user_password }, { where: { email } });
            const infoUser2 = await Users.findOne({ where: { email } })
            sendemail.passconfirm(email);
            let cookie = {
                user_name: infoUser2.dataValues.user_name,
                id_user: infoUser2.dataValues.id
            }
            const infoJwt = jwt.sign({ cookie }, process.env.WEB_TOKEN_SECRET);
            res.cookie("session", infoJwt)
            res.json({ cookie: infoJwt });
        } catch (error) {
            res.json(error)
        }
    },

    /**
     * Actualiza la distancia total recorrida por un usuario.
     * @param {INTEGER} id_user 
     * @param {INTEGER} total_distance 
     */
    updateUserDistance: async (id_user, total_distance) => {
        try {
            await Users.update({ total_distance }, { where: { id: id_user } })
            console.log("distance updated")
        } catch (error) {
            console.log(error)
        }
    },

    /**
     * Devuelve la distancia recorrida por un usuario por su id.
     * @param {JSON} req 
     * @param {JSON} res 
     */
    getDistancesById: async (req, res) => {
        try {
            const distances = await Users.findByPk(req.params.id, { attributes: ["this_week_distance", "total_distance"] })
            console.log(distances.dataValues)
            res.json(distances.dataValues)
        } catch (error) {
            console.log(error)
            res.json(false)
        }
    },

    /**
     * Devuelve la lista de los 10 usuarios que más distancia han recorrido.
     * @param {JSON} req 
     * @param {JSON} res 
     */
    getTopTen: async (req, res) => {
        try {
            const users = await Users.findAll({
                order: [['total_distance', 'DESC']],
                limit: 10
            });
            res.json(users)
        } catch (error) {
            console.log(error)
            res.json(false)
        }
    },
    /**
     * Responde con un listado con la id y el nombre de usuario de los amigos. las ids vienen en un Array.
     * @param {JSON} req 
     * @param {JSON} res 
     */
    getUserNames: async (req, res) => {
        try {
            const { ids } = req.body
            const userlist = await Users.findAll({
                where: {
                    id: { [Op.in]: ids }
                }
            ,  attributes: ["id", "user_name"] });
            res.json(userlist)
        } catch (error) {
            console.log(error)
            res.json(false)
        }
    }
}

module.exports = user