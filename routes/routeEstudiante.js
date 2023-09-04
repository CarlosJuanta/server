const express = require("express");
const router = express.Router();
const Estudiante = require("../models/estudianteModel");

// Ruta para agregar un estudiante
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
      correencargadoEstudiante,
      estadoEstudiante,
    } = req.body;

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
      correencargadoEstudiante,
      estadoEstudiante,
    });

    const resultado = await estudiante.save();

    res.status(200).json({ resultado });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error de tipo: " + error });
  }
});

// Ruta para obtener todos los estudiantes activos
router.get("/estudiante/getall", async (req, res) => {
  try {
    const resultado = await Estudiante.find().where({ estadoEstudiante: true }).sort({ nombreEstudiante: 1 });
    res.status(200).json({ resultado });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error de tipo: " + error });
  }
});

// Ruta para obtener la información de un estudiante por su ID
router.get("/estudiante/get/:id", async (req, res) => {
  try {
    const idEstudiante = req.params.id;
    const resultado = await Estudiante.findById(idEstudiante).where({ estadoEstudiante: true });

    if (!resultado) {
      return res.status(404).json({ msg: "Estudiante no encontrado" });
    }

    res.status(200).json({ resultado });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error de tipo: " + error });
  }
});

// Ruta para actualizar un estudiante por su ID
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

// Ruta para eliminar un estudiante por su ID
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
