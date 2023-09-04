const express = require("express");
const router = express.Router();
const Estudiante = require("../models/estudianteModel");

//rutas para el crud
router.post("/estudiante/add", async (req, res) => {
  try {
    const {
      cuiEstudiante,
      nombreEstudiante,
      apellidoEstudiante,
      fechanacEstudiante,
      direccionEstudiante,
      nacionalidadEstudiante,
      codigomineducEstudiante,
      cuiencargadoEstudiante,
      nombreencargadoEstudiante,
      apellidoencargadoEstudiante,
      direccionencargadoEstudiante,
      telefonoencargadoEstudiante,
      correoencargadoEstudiante,
      estadoEstudiante

    } = req.body;

    //pasarlo a la base de datos
    const estudiante = new Estudiante({
      cuiEstudiante,
      nombreEstudiante,
      apellidoEstudiante,
      fechanacEstudiante,
      direccionEstudiante,
      nacionalidadEstudiante,
      codigomineducEstudiante,
      cuiencargadoEstudiante,
      nombreencargadoEstudiante,
      apellidoencargadoEstudiante,
      direccionencargadoEstudiante,
      telefonoencargadoEstudiante,
      correoencargadoEstudiante,
      estadoEstudiante
    });

    const resultado = await estudiante.save();

    res.status(200).json({ resultado });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error de tipo: " + error });
  }
});

//////////////////////
router.get("/estudiante/getall", async (req, res) => {
  try {
    const resultado = await Estudiante.find().where({ estadoEstudiante: true }).sort({ nombreEstudiante: 1 });
    res.status(200).json({ resultado });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error de tipo: " + error });
  }
});

/////////////////////
router.put("/estudiante/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const options = { new: true };

    const resultado = await Estudiante.findByIdAndUpdate(id, data, options);

    res.status(200).json({ resultado });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error de tipo: " + error });
  }
});

/////////////////////
router.put("/estudiante/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const options = { new: true };

    const resultado = await Estudiante.findByIdAndUpdate(id, data, options);

    res.status(200).json({ resultado });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error de tipo: al eliminar" + error });
  }
});

module.exports = router;