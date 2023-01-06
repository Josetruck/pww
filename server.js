const express = require("express");
const router = require("./routes/routes");
const port = 5000;
const app = express();
const cookieParser = require('cookie-parser');
const multer = require("multer")
const fs = require('fs');

// Configuración del destino de las imagenes. Ordenado en carpetas por id del usuario.
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    console.log(req.headers.id_user)
    fs.mkdir(`./Images/${req.headers.id_user}`, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('Carpeta creada con éxito');
      }
    });
    const destination = `./Images/${req.headers.id_user}`
    cb(null, destination);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  }
});


const upload = multer({ storage: storage });
app.post("/upload", upload.single("file"), (req, res) => {
  // usa req.file.filename para obtener el nombre del archivo subido y devolverlo para insertar la url en la bd de imagenes.
  res.json({
    status: true,
    path: req.file.filename
  });
});

//endpoint para el uso de las imágenes en el cliente.
app.get('/Images/:id_user/:file', (req, res) => {
  res.sendFile(`${__dirname}/Images/${req.params.id_user}/${req.params.file}`);
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