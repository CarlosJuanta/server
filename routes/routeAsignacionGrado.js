const express = require("express");
const router = express.Router();
const Grado = require("../models/gradoModel");
const Estudiante = require("../models/estudianteModel");
const AsignacionGrado = require("../models/asignacionGradoModel");

// Ruta para asignar un estudiante a un grado
router.post("/asignaciongrado/add", async (req, res) => {
  try {
    const { codigoGrado, cuiEstudiante } = req.body;

    // Verifica si el grado con codigoGrado proporcionado existe en la base de datos
    const gradoExistente = await Grado.findOne({ codigoGrado });

    if (!gradoExistente) {
      return res.status(400).json({ msg: "El grado no existe en la base de datos" });
    }

    // Verifica si el estudiante con cuiEstudiante proporcionado existe en la base de datos
    const estudianteExistente = await Estudiante.findOne({ cuiEstudiante });

    if (!estudianteExistente) {
      return res.status(400).json({ msg: "El estudiante no existe en la base de datos" });
    }

    // Crea una nueva asignación de grado y estudiante
    const asignacionGrado = new AsignacionGrado({
      codigoGrado: gradoExistente._id, // Asigna el ObjectId del grado
      cuiEstudiante: estudianteExistente._id, // Asigna el ObjectId del estudiante
    });

    await asignacionGrado.save();

    res.status(200).json({ msg: "Estudiante asignado al grado con éxito" });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error de tipo: " + error });
  }
}); 
 
router.get("/asignaciongrado/getall", async (req, res) => {
    try {
      const resultado = await AsignacionGrado.find()
        .populate({
          path: "codigoGrado",
          populate: [
            {
              path: "cuiDocente",
              model: "Docente", // Reemplaza "Docente" con el nombre del modelo de tu colección de docentes
            },
          ],
        })
        .populate("cuiEstudiante", "cuiEstudiante nombreEstudiante apellidoEstudiante");
  
      if (!resultado) {
        return res.status(404).json({ msg: "No se encontraron asignaciones de grados" });
      }
  
      res.status(200).json({ resultado });
    } catch (error) {
      res.status(500).json({ msg: "Hubo un error de tipo: " + error });
    }
  });
  

  // Ruta para obtener estudiantes asignados a un grado por nombre del grado
router.get("/estudiantes/bygradonombre/:nombreGrado", async (req, res) => {
    try {
      const nombreGrado = req.params.nombreGrado;
  
      // Busca el grado por nombre
      const grado = await Grado.findOne({ nombreGrado });
  
      if (!grado) {
        return res.status(404).json({ msg: "No se encontró el grado especificado" });
      }
  
      // Busca los estudiantes asignados a ese grado
      const estudiantesAsignados = await AsignacionGrado.find({ codigoGrado: grado._id })
        .populate("cuiEstudiante", "cuiEstudiante nombreEstudiante apellidoEstudiante");
  
      if (!estudiantesAsignados) {
        return res.status(404).json({ msg: "No se encontraron estudiantes asignados a este grado" });
      }
  
      res.status(200).json({ estudiantesAsignados });
    } catch (error) {
      res.status(500).json({ msg: "Hubo un error de tipo: " + error });
    }
  });
  
  router.get("/asignaciongrado/get/:id", async (req, res) => {
    try {
      const idAsignacionGrado = req.params.id;
      const resultado = await AsignacionGrado.findById(idAsignacionGrado)
        .populate({
          path: "codigoGrado",
          populate: {
            path: "cuiDocente",
            model: "Docente", // Reemplaza "Docente" con el nombre del modelo de tu colección de docentes
          },
        })
        .populate("cuiEstudiante", "cuiEstudiante nombreEstudiante apellidoEstudiante");
  
      if (!resultado) {
        return res.status(404).json({ msg: "Asignación de grado no encontrada" });
      }
  
      res.status(200).json({ resultado });
    } catch (error) {
      res.status(500).json({ msg: "Hubo un error de tipo: " + error });
    }
  });
  
  // Ruta para actualizar una asignación de grado por su ID
  router.put("/asignaciongrado/update/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const options = { new: true };
  
      const resultado = await AsignacionGrado.findByIdAndUpdate(id, data, options);
  
      res.status(200).json({ resultado });
    } catch (error) {
      res.status(500).json({ msg: "Hubo un error de tipo: " + error });
    }
  }); 
  
  // Ruta para eliminar una asignación de grado por su ID
  router.delete("/asignaciongrado/delete/:id", async (req, res) => {
    try {
      const id = req.params.id;
  
      const resultado = await AsignacionGrado.findByIdAndDelete(id);
  
      if (!resultado) {
        return res.status(404).json({ msg: "Asignación de grado no encontrada" });
      }
  
      res.status(200).json({ msg: "Asignación de grado eliminada correctamente" });
    } catch (error) {
      res.status(500).json({ msg: "Hubo un error de tipo al eliminar: " + error });
    }
  });
  
  module.exports = router;