const router = require("express").Router();
const profile = require("../controllers/profiles.controllers");
const user = require("../controllers/users.controllers")
const clans = require("../controllers/clans.controllers");
const images = require("../controllers/images.controllers");
const req_friend = require("../controllers/req_friend.controllers")




//USER - PROFILE
router.post("/register", user.register); //funcion que inserta en users
//router.post("/updateProfile", profile.update)// Modifica los datos personales del usuario.
router.post("/login", user.login) // funcion que verifica el usuario y la contraseña. pone una cookie
router.post("/searchUser", user.searchUser)
router.post("/searchAvaliableUser", user.searchAvaliableUser)
router.post("/newClan", clans.newClan)
router.get("/loggedUser",user.getUserData)
router.get("/emailexists/:email", user.emailExists)
router.post("/sendEmailVerify", user.confirmEmail)
router.post("/passRecovery", user.passRecovery)
router.post("/passReset", user.passReset)
router.get("/getUserById/:id", user.getUserById)
router.get(`/getDistance/:id`, user.getDistancesById)
router.get("/getTopTen", user.getTopTen)

//Images
router.post("/insertImg", images.insert)
router.get("/getImagesById/:id_user", images.getImagesById)
router.post("/addComment", images.addComment)
router.post("/deleteComent", images.deleteComment)
router.delete("/image/:_id", images.deleteImage)

//Friend Requests

router.post("/sendRequest", req_friend.newRequest)
router.get("/getUserRequestIn/:id", req_friend.getUserRequestIn)
router.get("/getUserRequestOut/:id",req_friend.getUserRequestOut)
router.post("/requestResponse", req_friend.requestResponse)



module.exports = router;