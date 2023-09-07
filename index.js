const port = process.env.PORT || 3000;
const express = require("express");
const cors = require("cors");
const connect = require("./database/connection");
const docente = require("./routes/routeDocente");
const estudiante = require("./routes/routeEstudiante");
const grado = require("./routes/routeGrado");
const curso = require("./routes/routeCurso");


//conectamos a la BD con la función que exportamos
connect();

//Express
const app = express();

//usamos cors para evitar errores de CORS
app.use(
    cors({
      origin: [
        "*",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://localhost:5173",
      ],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
      optionsSuccessStatus: 200,
    })
  );


app.get("/", (req, res) => {
  res.send("Hola mundo");
});

//DEFINIR QUE USAR JSON****
app.use(express.json());


//RUTAS FINALES
app.use("/api", docente);
app.use("/api", estudiante);
app.use("/api", grado);
app.use("/api", curso);

//Iniciar el servidor
app.listen(port, () => {
  console.log(`Server corriendo en http://localhost:${port}`);
});
