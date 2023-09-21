const express = require("express");
const router = express.Router();
const Estudiante = require("../models/estudianteModel");
const Grado = require("../models/gradoModel");
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
      codigoGrado,
      estadoEstudiante,
    } = req.body;
     
     // Verifica si el grado con codigoGrado proporcionado existe en la base de datos
     const gradoExistente = await Grado.findOne({ codigoGrado });
   
     if (!gradoExistente) {
       return res.status(400).json({ msg: "El grado no existe en la base de datos" });
     }

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
      codigoGrado: gradoExistente._id, // Asigna el ObjectId del grado
      estadoEstudiante,
    });

    const resultado = await estudiante.save();

    res.status(200).json({ resultado });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error de tipo: " + error });
  }
}); 


//agrega un grado más al estudiante
// Ruta para agregar más grados a un estudiante existente
router.post("/estudiante/agregarGrado/:id", async (req, res) => {
  try {
    const idEstudiante = req.params.id;
    const { codigoGrado } = req.body;

    // Verifica si el grado con codigoGrado proporcionado existe en la base de datos
    const gradoExistente = await Grado.findOne({ codigoGrado });

    if (!gradoExistente) {
      return res.status(400).json({ msg: "El grado no existe en la base de datos" });
    }

    // Verifica si el estudiante existe en la base de datos y agrega el grado
    const updateEstudiante = await Estudiante.findByIdAndUpdate(idEstudiante,
     {$push: {codigoGrado: gradoExistente}},
     {new: true}
    );
    
    if (!updateEstudiante) {
      return res.status(404).json({ msg: "El estudiante no existe en la base de datos" });
    }

    res.status(200).json({ message: "Nuevo grado añadido al estudiante", estudiante: updateEstudiante });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error de tipo: " + error }) ;
  }
});

////obtener cursos por grado
router.post("/estudiante/getbygrado", async (req, res) => {
  try {
    const { codigoGrado } = req.body;
    
    // Verifica si el grado con el código proporcionado existe en la base de datos
    const gradoExistente = await Grado.findOne({ codigoGrado });

    if (!gradoExistente) {
      return res.status(400).json({ msg: "El grado no existe en la base de datos" });
    }

    // Busca los cursos que están asignados a este grado
    const gradosAsignados = await Estudiante.find({ codigoGrado: gradoExistente._id })
    .populate("codigoGrado", "codigoGrado nombreGrado")
    res.status(200).json({gradosAsignados});
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
