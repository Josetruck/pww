const mongoose = require("mongoose");
const UserModel = require("../models/userModels");
const conn = require("../database/mongo");

/* const password = process.env.mPassword;
const dblocalM = process.env.mdblocalM */
const connectionS = `mongodb://127.0.0.1:27017/test`;
/* const connectionL = process.env.projectMoviesDB */

const user = {
  registerUser: async (req, res) => {
    await mongoose
    .connect("mongodb://127.0.0.1:27017/test", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Base de datos de Mongo conectada");
    })
    .catch((err) => {
      console.error(err);
    });
    const { firstName, lastName, linkedin } = req.body;

    let davinia = {
      _id: new mongoose.Types.ObjectId(),
      name: {
        firstName,
        lastName,
      },
      created: Date.now(),
      linkedin,
    };

    let userDavinia = new UserModel(davinia);

    await userDavinia.save(async function (err) {
      if (err) throw err;
      console.log("Inserción correcta");
     await mongoose.disconnect();
      console.log("desconectado")
      res.render("index");
    });
    
  },

  updateUser: async (req, res) => {
    await mongoose
    .connect("mongodb://127.0.0.1:27017/test", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Base de datos de Mongo conectada");
    })
    .catch((err) => {
      console.error(err);
    });
    console.log("Conexion")

    const { firstName, lastName, linkedin } = req.body;
    console.log(req.body)
    UserModel.findByIdAndUpdate(req.body._id, { "name": { "firstName": firstName, "lastName": lastName }, "linkedin": linkedin } , async (err, docs)=> {
      if (err) throw err;
      console.log("Actualización: " + docs);
      res.render("index");
     await mongoose.disconnect();
      console.log("desconectado")
    });
    
    
  },
  searchUser: async (req, res) => {
    console.log("searchUser");
    mongoose
  .connect("mongodb://127.0.0.1:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Base de datos de Mongo conectada");
  })
  .catch((err) => {
    console.error(err);
  });
    await UserModel.find({ "name.lastName": req.body.lastName }).exec(async function (err, users) {
      if (err) throw err;
      console.log(users[0]._id)
      res.render("index", { users: users, user1: users[0]._id, firstName: users[0].name.firstName, lastName: users[0].name.lastName, linkedin: users[0].linkedin });
     await mongoose.disconnect();
      console.log("desconectado")
      
    });
  },
};

module.exports = user;