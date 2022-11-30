const express = require("express");
const router = require("./routes/routes");
const port = 3000;
const app = express();
const cookieParser = require('cookie-parser');

// Middlewares: 
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Motores de vistas:
app.set("view engine", "ejs");

// Rutas estáticas
app.use(express.static("./views"));


// Uso de rutas
app.use("/", router);


app.listen(port, () => console.log(`Server ON: ${port}`));