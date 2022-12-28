const express = require("express");
const router = require("./routes/routes");
const port = 5000;
const app = express();
const cookieParser = require('cookie-parser');
const multer = require("multer")
const path = require("path")


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Images");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}--${file.originalname}`);
    }
}); 


const upload = multer({storage: storage});
app.post("/upload", upload.single("file"), (req, res) => {
    console.log(req.file)
    // Puedes utilizar req.file.filename para obtener el nombre del archivo subido
    res.json({
        status:true,
        path: req.file.filename
    });
  });

// Middlewares: 
app.use(cookieParser());
app.use(express.json());
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000', // Dirección del cliente React
  credentials: true
}));
// Uso de rutas
app.use("/", router);





app.listen(port, () => console.log(`Server ON: ${port}`));