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
    const resultado = await Docente.find().where({ estadoDocente: true }).sort({ nombreDocente: 1 });
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

module.exports = router;