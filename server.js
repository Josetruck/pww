const express = require("express");
const router = require("./routes/routes");
const port = 5000;
const app = express();
const cookieParser = require('cookie-parser');
const multer = require("multer")
const path = require("path")

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
app.use(upload.single("file"))
app.get("/upload",(req,res)=> res.render("upload"))





app.listen(port, () => console.log(`Server ON: ${port}`));