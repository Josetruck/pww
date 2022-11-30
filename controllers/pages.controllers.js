
const user = require("../controllers/users.controllers");
const jwt = require("jsonwebtoken");

const pages = {
    /**
     * Renderiza la home
     * @param {json} req 
     * @param {json} res 
     */
    home: (req, res) => {
           res.render("./index.ejs");
    },
        
    /**
     * Renderiza la página para cambiar de contraseña
     * @param {json} req 
     * @param {json} res 
     */
    newPassword: (req, res) => {
        res.render("./newPass.ejs");
    },
        
    /**
     * Renderiza la página que te cambia de contraseña
     * @param {json} req 
     * @param {json} res 
     */
    forgetPass: (req, res) => {
        res.render("./forgetPass.ejs");
    },
        
    /**
     * Renderiza la página de registro
     * @param {json} req 
     * @param {json} res 
     */
    signin: (req,res)=>{
        res.render("./signin.ejs")
    },
        
    /**
     * Renderiza la página de login de usuario
     * @param {json} req 
     * @param {json} res 
     */
    login: (req,res)=>{
        res.render("./login.ejs")

    },
        
    /**
     * Renderiza la página del login del administrador
     * @param {json} req 
     * @param {json} res 
     */
    loginAdmin: (req,res)=>{
        res.render("./login_admin.ejs");
    },
        
    /**
     * Renderiza la página del dashboard del adminsitrado si está logueado
     * @param {json} req 
     * @param {json} res 
     */
    dashboard: (req,res)=>{
        var cookies = req.cookies;
        if(cookies){
            var token = cookies.infoJwt;
            try {
              let jwtVerify = jwt.verify(token, "m1m0t0");
              res.render("./dashboard.ejs");
            } catch (error) {
                res.status(403).send("403 - FORBIDDEN - No tienes permisos para acceder aquí");
            }
        }
    },
        
    /**
     * Renderiza la página del formulario de contacto
     * @param {json} req 
     * @param {json} res 
     */
    contact: (req,res)=>{
        res.render("./contact.ejs")
    },
        
    /**
     * Renderiza la página del perfil de usuario
     * @param {json} req 
     * @param {json} res 
     */
    userAccount:(req, res) => {
        res.render("./userAccount.ejs")
    },
    
    /**
     * Renderiza la página de edición de datos personales y dirección de usuario
     * @param {json} req 
     * @param {json} res 
     */
    profile: async (req, res) => {
        res.render("./profile.ejs")
    }
};

module.exports = pages;