const router = require("express").Router();
const profile = require("../controllers/profiles.controllers");
const user = require("../controllers/users.controllers")
const pages = require("../controllers/pages.controllers");
const clans = require("../controllers/clans.controllers");
const images = require("../controllers/images.controllers");




//PAGES
router.get("/", pages.home);//pagina de inicio
router.get("/signin", pages.signin) //pagina del registro de usuario
router.get("/passrecovery", pages.forgetPass) //Pagina para recuperar contraseña
router.get("/forgetpassword/:infoJwt", pages.newPassword) //Pagina para establecer la nueva contraseña
router.get("/login", pages.login) //Pagina que muestra el formulario de login
router.get("/login-admin", pages.loginAdmin) //Pagina que muestra el formulario de login del administrador
router.get("/contact", pages.contact)//Formulario de contacto
router.get("/dashboard", pages.dashboard)


//USER - PROFILE
router.post("/register", user.register); //funcion que inserta en users
router.post("/updateProfile", profile.update)// Modifica los datos personales del usuario.
router.post("/login", user.login) // funcion que verifica el usuario y la contraseña. pone una cookie
router.post("/searchUser", user.searchUser)
router.post("/newClan", clans.newClan)

//Images
router.post("/upload", images.upload)

module.exports = router;