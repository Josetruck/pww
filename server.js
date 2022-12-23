const express = require("express");
const router = require("./routes/routes");
const port = 5000;
const app = express();
const cookieParser = require('cookie-parser');
const path = require("path")
const multer = require("multer")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Images");
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, `${Date.now()}--${file.originalname}`);
    }
});

const upload = multer({storage: storage});

// Middlewares: 
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(upload.single("file"))
// Motores de vistas:
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

// Rutas estáticas
app.use(express.static("./views"));


// Uso de rutas
app.use("/", router);
app.get("/upload",(req,res)=> res.render("upload"))

//Upload Imagen


app.listen(port, () => console.log(`Server ON: ${port}`));