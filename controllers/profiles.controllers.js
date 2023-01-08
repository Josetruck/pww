const mongoose = require("mongoose");
const Profile = require("../models/mongodb/profiles.models");
const url = `mongodb://127.0.0.1:27017/pww`;


const profile = {
  /**
   * Funcion que inserta en la base de datos MongoDB los datos personales del usuario. Se ejecuta despues de hacer la inserción en la base de datos MySQL con la Id del usuario para relacionar ambas bases de datos. 
   * @param {JSON} req 
   * @param {JSON} res 
   * @param {INTEGER} id_user 
   */
  register: async (req, res, id_user) => {
    try {
      await mongoose.connect(url).catch(error => handleError(error));
      const { firstname, lastname, birth_date, phone_number, location, postal_code } = req.body;
      await Profile.create({ "reg_date": Date.now(), id_user, firstname, lastname, birth_date, phone_number, location, postal_code, "friend_list": [] })
    } catch (error) {
      res.json(error)
    } finally {
      await mongoose.connection.close();
    }
  },
/**
 * Función que actualiza los datos personales del usuario.
 * @param {JSON} req 
 * @param {JSON} res 
 */
  update: async (req, res) => {
    let user_data = await user.getFromCookie(req, res)
    await mongoose.connect(url).catch(error => handleError(error));
    try {
      var id_user = user_data.id_user
      const { firstname, lastname, birth_date, phone_number, location, postal_code } = req.body;
      await Profile.findOneAndUpdate({ id_user }, { firstname, lastname, birth_date, phone_number, location, postal_code })
      res.send("Actualización correcta")
    } catch (error) {
      res.send(error)
    } finally {
      await mongoose.connection.close();
    }
  },
  /**
   * Funcion del back-end
   * @param {INTEGER} id_user 
   * @returns el perfil del usuario a otra función en user.controllers para responder con todos los datos pertenecientes al usuario.
   */
  getById: async (id_user) => {
    try {
      await mongoose.connect(url).catch(error => handleError(error));
      return await Profile.findOne({ id_user })
    } catch (error) {
      res.json(error)
    } finally {
      await mongoose.connection.close();
    }
  },
  /**
   * Actualiza el array con la lista de ids de los usuarios que se han añadido como amigos.
   * @param {INTEGER} id_from 
   * @param {INTEGER} id_to 
   * @returns true o false
   */
  addfriend: async (id_from, id_to)=>{
    try {
      await mongoose.connect(url).catch(error => handleError(error));
      await Profile.update({id_user: id_to},{ $push: { friend_list: id_from } })
      var profile = await Profile.findOne({id_user:id_to})
      console.log("addedfriend", profile)
      return true
    } catch (error) {
      console.log(error)
      return false
    } finally {
      await mongoose.connection.close();
    }
  },
  /**
   * Elimina al usuario del array "friend_list".
   * @param {JSON} req 
   * @param {JSON} res 
   */
  deleteFriend: async (req, res)=>{
    const id_from = parseInt(req.params.id_from)
    const id_to = parseInt(req.params.id_to)
    try {
      await mongoose.connect(url).catch(error => handleError(error));
      const userFrom= await Profile.findOneAndUpdate({"id_user": id_to},{ $pull: { "friend_list": id_from } })
      const userTo= await Profile.findOneAndUpdate({"id_user": id_from},{ $pull: { "friend_list": id_to } })
      res.json(true) 
    } catch (error) {
      console.log(error)
      res.json(false)
    } finally {
      await mongoose.connection.close();
    }
  }

};

module.exports = profile;