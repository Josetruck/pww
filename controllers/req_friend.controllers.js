const mongoose = require("mongoose");
const Users = require("../models/mysql/users.models")
const Req_friend = require("../models/mysql/req.friend")
const profile = require("../controllers/profiles.controllers");
const user = require("../controllers/users.controllers")
const url = `mongodb://127.0.0.1:27017/pww`;


/* try {
    await mongoose.connect(url).catch(error => handleError(error));   
} catch (error) {
    res.json(error)
} finally {
    await mongoose.connection.close()
} */

const requestf = {
    /**
     * Inserta una solicitud de amistad en la base de datos.
     * @param {JSON} req 
     * @param {JSON} res 
     */
    newRequest: async (req, res) => {
        try {
            const { id_from, id_to } = req.body;
            const requested = await Req_friend.create({ fk_id_from: id_from, fk_id_to: id_to, req_status:"progress" })
            res.json(true)
        } catch (error) {
            console.log(error)
            res.json(false)
        }
    },
    /**
     * Responde con un listado de todas las solicitudes que han hecho a un usuario.
     * @param {JSON} req 
     * @param {JSON} res 
     */
    getUserRequestIn: async (req, res) => {
        try {
            res.json(await Req_friend.findAll({ where: { fk_id_to: req.params.id } }))
        } catch (error) {
            res.json(error)
        }
    },
    /**
     * Responde con un listado de todas las solicitudes que ha realizado un usuario.
     * @param {JSON} req 
     * @param {JSON} res 
     */
    getUserRequestOut: async (req, res) => {
        try {
            res.json(await Req_friend.findAll({ where: { fk_id_from: req.params.id } }))
        } catch (error) {
            res.json(error)
        }
    },
    /**
     * Se ejecuta cuando un usuario responde a la solicitud de amistad. Responde con un booleano si realiza la actualización de la lista de amigos en la base de datos.
     * @param {JSON} req 
     * @param {JSON} res 
     */
    requestResponse: async (req, res) => {
        try {
            const { id, response } = req.body;
            const request = await Req_friend.update({ req_status: response }, { where: { id: id } })
            const requestInfo = await Req_friend.findByPk(id)

            //Actualiza el array con ids del perfil de los usuarios con las ids que participan en la solicitud de amistad.
            if(response =="accepted"){
                await profile.addfriend(requestInfo.fk_id_from, requestInfo.fk_id_to)
                await profile.addfriend(requestInfo.fk_id_to, requestInfo.fk_id_from)
            }
            res.json(true)
        } catch (error) {
            console.log(error)
            res.json(false)
        }

    }
}

module.exports = requestf