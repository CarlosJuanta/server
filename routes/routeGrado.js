const express = require("express");
const router = express.Router();
const Grado = require("../models/gradoModel");
const Docente = require("../models/docenteModel"); // Asegúrate de importar el modelo de Docente

// Ruta para agregar un grado con relación a un docente
router.post("/grado/add", async (req, res) => {
  try {
    const {
      codigoGrado,
      nombreGrado,
      descripcionGrado,
      seccionGrado, // Cambiado de "sección" a "seccion"
      cuiDocente,
    } = req.body;

    // Verifica si el docente con el cuiDocente proporcionado existe en la base de datos
    const docenteExistente = await Docente.findOne({ cuiDocente });

    if (!docenteExistente) {
      return res
        .status(400)
        .json({ msg: "El docente no existe en la base de datos" });
    }

    // Crea un nuevo grado y establece la relación con el docente
    const grado = new Grado({
      codigoGrado,
      nombreGrado,
      descripcionGrado,
      seccionGrado,
      cuiDocente: docenteExistente._id, // Asigna el ObjectId del docente
    });

    const resultado = await grado.save();

    res.status(200).json({ resultado });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error de tipo: " + error });
  }
});

// Ruta para obtener todos los grados
// Ruta para obtener todos los grados con datos completos de docente asignado
router.get("/grado/getall", async (req, res) => {
  try {
    const resultado = await Grado.find().populate("cuiDocente");

    if (!resultado) {
      return res.status(404).json({ msg: "No se encontraron grados" });
    }

    res.status(200).json({ resultado });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error de tipo: " + error });
  }
});
// Ruta para obtener la información de un grado por su ID
router.get("/grado/get/:id", async (req, res) => {
  try {
    const idGrado = req.params.id;
    const resultado = await Grado.findById(idGrado);

    if (!resultado) {
      return res.status(404).json({ msg: "Grado no encontrado" });
    }

    res.status(200).json({ resultado });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error de tipo: " + error });
  }
});

// Ruta para actualizar un grado por su ID
router.put("/grado/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const options = { new: true };

    const resultado = await Grado.findByIdAndUpdate(id, data, options);

    res.status(200).json({ resultado });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error de tipo: " + error });
  }
});

// Ruta para eliminar un grado por su ID
router.delete("/grado/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const resultado = await Grado.findByIdAndDelete(id);

    if (!resultado) {
      return res.status(404).json({ msg: "Grado no encontrado" });
    }

    res.status(200).json({ msg: "Grado eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error de tipo: al eliminar" + error });
  }
});

// Ruta para asignar un docente a un grado existente
router.post("/grado/asignarDocente/:id", async (req, res) => {
  try {
    const idGrado = req.params.id;
    const { cuiDocente } = req.body;

    // Verifica si el docente con el CUI proporcionado existe en la base de datos
    const docenteExistente = await Docente.findOne({ cuiDocente });

    if (!docenteExistente) {
      return res
        .status(400)
        .json({ msg: "El docente no existe en la base de datos" });
    }

    // Verifica si el grado existe en la base de datos y asigna el docente
    const updateGrado = await Grado.findByIdAndUpdate(
      idGrado,
      { $push: { cuiDocente: docenteExistente } },
      { new: true }
    );

    if (!updateGrado) {
      return res
        .status(404)
        .json({ msg: "El grado no existe en la base de datos" });
    }

    res
      .status(200)
      .json({ message: "Docente asignado al grado", grado: updateGrado });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error de tipo: " + error });
  }
});

// Ruta para quitar un docente de un grado
router.delete("/grado/quitarDocente/:idGrado", async (req, res) => {
  try {
    const idGrado = req.params.idGrado;
    const { cuiDocente } = req.body;

    // Verifica si el grado con el ID proporcionado existe en la base de datos
    const gradoExistente = await Grado.findById(idGrado);

    if (!gradoExistente) {
      return res
        .status(400)
        .json({ msg: "El grado no existe en la base de datos" });
    }

    // Busca el índice del docente que deseas quitar en el array de cuiDocente del grado
    const docenteIndex = gradoExistente.cuiDocente.indexOf(cuiDocente);

    if (docenteIndex === -1) {
      return res
        .status(400)
        .json({ msg: "El docente no está asignado al grado" });
    }

    // Quita el docente del array de cuiDocente del grado
    gradoExistente.cuiDocente.splice(docenteIndex, 1);

    // Guarda la actualización en la base de datos
    const updatedGrado = await gradoExistente.save();

    res
      .status(200)
      .json({ message: "Docente quitado del grado", grado: updatedGrado });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error de tipo: " + error });
  }
});

module.exports = router;
