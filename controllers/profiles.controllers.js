const mongoose = require("mongoose");
const Profile = require("../models/mongodb/profiles.models");
const url = `mongodb://127.0.0.1:27017/pww`;


const profile = {
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
  addfriend: async (id_from, id_to)=>{
    try {
      await mongoose.connect(url).catch(error => handleError(error));
      await Profile.update({id_user: id_to},{ $push: { friend_list: id_from } })
      var profile = await Profile.findOne({id_user:id_to})
      console.log("addedfriend",profile)
      return true
    } catch (error) {
      console.log(error)
      return false
    } finally {
      await mongoose.connection.close();
    }
  }

};

module.exports = profile;