const express = require("express");
const router = express.Router();
const Grado = require("../models/gradoModel");
const Curso = require("../models/cursoModel"); 

// Ruta para agregar un grado con relación a un docente
router.post("/curso/add", async (req, res) => {
  try {
    const {
      codigoCurso,
      nombreCurso,
      descripcionCurso,
      codigoGrado,
    } = req.body;

    // Verifica si el grado con codigoGrado proporcionado existe en la base de datos
    const gradoExistente = await Grado.findOne({ codigoGrado });

    if (!gradoExistente) {
      return res.status(400).json({ msg: "El grado no existe en la base de datos" });
    }

    // Crea un nuevo grado y establece la relación con el docente
    const curso = new Curso({
      codigoCurso,
      nombreCurso,
      descripcionCurso,
      codigoGrado: gradoExistente._id, // Asigna el ObjectId del grado
    });

    const resultado = await curso.save();

    res.status(200).json({ resultado });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error de tipo: " + error });
  }
});

// Ruta para obtener todos los grados
// Ruta para obtener todos los grados con datos completos de docente asignado
router.get("/curso/getall", async (req, res) => {
    try {
      const resultado = await Curso.find()
      .populate({
        path: "codigoGrado",
        populate: {
          path: "cuiDocente",
          model: "Docente", // Reemplaza "Docente" con el nombre del modelo de tu colección de docentes
        },
      });

      
      if (!resultado) {
        return res.status(404).json({ msg: "No se encontraron curso" });
      }
  
      res.status(200).json({ resultado });
    } catch (error) {
      res.status(500).json({ msg: "Hubo un error de tipo: " + error });
    }
  });
// Ruta para obtener la información de un grado por su ID
router.get("/curso/get/:id", async (req, res) => {
  try {
    const idCurso = req.params.id;
    const resultado = await Curso.findById(idCurso);

    if (!resultado) {
      return res.status(404).json({ msg: "Curso no encontrado" });
    }

    res.status(200).json({ resultado });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error de tipo: " + error });
  }
});

// Ruta para actualizar un grado por su ID
router.put("/curso/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const options = { new: true };

    const resultado = await Curso.findByIdAndUpdate(id, data, options);

    res.status(200).json({ resultado });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error de tipo: " + error });
  }
});

// Ruta para eliminar un grado por su ID
router.delete("/curso/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const resultado = await Curso.findByIdAndDelete(id);

    if (!resultado) {
      return res.status(404).json({ msg: "Grado no encontrado" });
    }

    res.status(200).json({ msg: "Grado eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error de tipo: al eliminar" + error });
  }
});

module.exports = router;
