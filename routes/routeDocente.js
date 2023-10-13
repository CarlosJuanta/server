const express = require("express");
const router = express.Router();
const Docente = require("../models/docenteModel");

//rutas para el crud
router.post("/docente/add", async (req, res) => {
  try {
    const {
      cuiDocente,
      nombreDocente,
      apellidoDocente,
      telefonoDocente,
      correoDocente,
      direccionDocente,
      nacionalidadDocente,
      estadoDocente,
      rol,
      username,
      password,
    } = req.body;

    //pasarlo a la base de datos
    const docente = new Docente({
      cuiDocente,
      nombreDocente,
      apellidoDocente,
      telefonoDocente,
      correoDocente,
      direccionDocente,
      nacionalidadDocente,
      estadoDocente,
      rol,
      username,
      password,
    });

    const resultado = await docente.save();

    res.status(200).json({ resultado });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error de tipo: " + error });
  }
});

//////////////////////
router.get("/docente/getall", async (req, res) => {
  try {
    const resultado = await Docente.find().sort({ nombreDocente: 1 });
    res.status(200).json({ resultado });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error de tipo: " + error });
  }
});

/////////////////////
router.put("/docente/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const options = { new: true };

    const resultado = await Docente.findByIdAndUpdate(id, data, options);

    res.status(200).json({ resultado });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error de tipo: " + error });
  }
});

/////////////////////
router.put("/docente/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const options = { new: true };

    const resultado = await Docente.findByIdAndUpdate(id, data, options);

    res.status(200).json({ resultado });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error de tipo: al eliminar" + error });
  }
});

router.post("/docente/getbyusername", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Buscar al docente por el nombre de usuario en la base de datos
    const docente = await Docente.findOne({ username });

    if (!docente) {
      return res.status(403).json({ message: "El docente no existe" });
    }

    // Verificar si el campo "estadoDocente" del docente es verdadero
    if (!docente.estadoDocente) {
      return res
        .status(403)
        .json({
          message: "El docente ha sido eliminado, contacte al administrador",
        });
    }

    // Verificar si la contraseña coincide con la almacenada en la base de datos
    if (docente.password !== password) {
      return res.status(401).json({ message: "Contraseña inválida" });
    }

    // Usuario y contraseña son válidos, puedes devolver los campos requeridos
    const { nombreDocente, rol, _id } = docente;

    res.status(200).json({ _id, nombreDocente, rol, username });
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo obtener al docente por el username",
      messageSys: error.message,
    });
  }
});
module.exports = router;
