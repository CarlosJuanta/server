const express = require("express");
const router = express.Router();
const Estudiante = require("../models/estudianteModel");
const Grado = require("../models/gradoModel");
const Asistencia = require("../models/asistenciaModel");
const Reporte = require("../models/reporteModel");
const Curso = require("../models/cursoModel");

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
      asistencia,
      reporte,
      notas,
    } = req.body;

    // Verifica si el grado con codigoGrado proporcionado existe en la base de datos
    const gradoExistente = await Grado.findOne({ codigoGrado });

    if (!gradoExistente) {
      return res
        .status(400)
        .json({ msg: "El grado no existe en la base de datos" });
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
      asistencia,
      reporte,
      notas,
    });

    const resultado = await estudiante.save();

    res.status(200).json({ resultado });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error de tipo: " + error });
  }
});

// Ruta para agregar un grado a un estudiante existente
router.post("/estudiante/agregarGrado/:id", async (req, res) => {
  try {
    const idEstudiante = req.params.id;
    const { codigoGrado } = req.body;

    // Verifica si el grado con codigoGrado proporcionado existe en la base de datos
    const gradoExistente = await Grado.findOne({ codigoGrado });

    if (!gradoExistente) {
      return res
        .status(400)
        .json({ msg: "El grado no existe en la base de datos" });
    }

    // Verifica si el estudiante existe en la base de datos y agrega el grado
    const updateEstudiante = await Estudiante.findByIdAndUpdate(
      idEstudiante,
      { $push: { codigoGrado: gradoExistente } },
      { new: true }
    );

    if (!updateEstudiante) {
      return res
        .status(404)
        .json({ msg: "El estudiante no existe en la base de datos" });
    }

    res
      .status(200)
      .json({
        message: "Nuevo grado añadido al estudiante",
        estudiante: updateEstudiante,
      });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error de tipo: " + error });
  }
});

// Ruta para quitar un grado de un estudiante existente
router.delete("/estudiante/quitarGrado/:id", async (req, res) => {
  try {
    const idEstudiante = req.params.id;
    const { codigoGrado } = req.body;

    // Verifica si el estudiante existe en la base de datos
    const estudianteExistente = await Estudiante.findById(idEstudiante);

    if (!estudianteExistente) {
      return res
        .status(404)
        .json({ msg: "El estudiante no existe en la base de datos" });
    }

    // Busca el índice del grado que deseas quitar en el array de código de grados del estudiante
    const gradoIndex = estudianteExistente.codigoGrado.indexOf(codigoGrado);

    if (gradoIndex === -1) {
      return res
        .status(400)
        .json({ msg: "El grado no está asociado al estudiante" });
    }

    // Quita el grado del array de código de grados del estudiante
    estudianteExistente.codigoGrado.splice(gradoIndex, 1);

    // Guarda la actualización en la base de datos
    const updatedEstudiante = await estudianteExistente.save();

    res
      .status(200)
      .json({
        message: "Grado quitado del estudiante",
        estudiante: updatedEstudiante,
      });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error de tipo: " + error });
  }
});

// Ruta para agregar asistencia a un estudiante existente
router.post("/estudiante/agregarAsistencia/:id", async (req, res) => {
  try {
    const idEstudiante = req.params.id;
    const { estado, fecha } = req.body;

    // Verifica si el estudiante existe en la base de datos
    const estudianteExistente = await Estudiante.findById(idEstudiante);

    if (!estudianteExistente) {
      return res
        .status(404)
        .json({ msg: "El estudiante no existe en la base de datos" });
    }

    // Crea un nuevo objeto de asistencia con el estado y la fecha proporcionados
    const nuevaAsistencia = new Asistencia({
      estado,
      fecha,
      estudiante: estudianteExistente._id, // Establece la referencia al estudiante
    });
    // Guarda la nueva asistencia en la base de datos
    await nuevaAsistencia.save();
    // Agrega la referencia de la asistencia al estudiante
    estudianteExistente.asistencias.push(nuevaAsistencia._id);
    // Guarda el estudiante actualizado
    await estudianteExistente.save();
    res
      .status(200)
      .json({
        message: "Asistencia añadida al estudiante",
        asistencia: nuevaAsistencia,
      });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error: " + error });
  }
});

// Ruta para agregar un reporte a un estudiante existente

router.post("/estudiante/agregarReporte/:id", async (req, res) => {
  try {
    const idEstudiante = req.params.id;
    const { motivo, descripcion } = req.body;

    // Verifica si el estudiante existe en la base de datos
    const estudianteExistente = await Estudiante.findById(idEstudiante);
    if (!estudianteExistente) {
      return res
        .status(404)
        .json({ msg: "El estudiante no existe en la base de datos" });
    }

    // Obtiene la fecha actual
    const fecha = new Date();

    // Crea un nuevo objeto de reporte con el motivo, la descripción y la fecha proporcionados
    const nuevoReporte = new Reporte({
      motivo,
      descripcion,
      fecha,
      estudiante: estudianteExistente._id, // Establece la referencia al estudiante
    });

    // Guarda el nuevo reporte en la base de datos
    await nuevoReporte.save();

    // Agrega la referencia del reporte al estudiante
    estudianteExistente.reportes.push(nuevoReporte._id);

    // Guarda el estudiante actualizado
    await estudianteExistente.save();

    res
      .status(200)
      .json({
        message: "Reporte añadido al estudiante",
        reporte: nuevoReporte,
      });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error: " + error });
  }
});

////obtener cursos por grado
router.post("/estudiante/getbygrado", async (req, res) => {
  try {
    const { codigoGrado } = req.body;

    // Verifica si el grado con el código proporcionado existe en la base de datos
    const gradoExistente = await Grado.findOne({ codigoGrado });

    if (!gradoExistente) {
      return res
        .status(400)
        .json({ msg: "El grado no existe en la base de datos" });
    }

    // Busca los cursos que están asignados a este grado
    const gradosAsignados = await Estudiante.find({
      codigoGrado: gradoExistente._id,
    })
      .populate("codigoGrado", "codigoGrado nombreGrado")
      .populate("asistencias", "estado fecha")
      .populate("reportes", "motivo descripcion fecha")
      .populate({
        path: "notas",
        populate: {
          path: "curso",
          model: "Curso", // Reemplaza 'Curso' con el nombre del modelo de cursos
        },
      });
    res.status(200).json({ gradosAsignados });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error de tipo: " + error });
  }
});
// Ruta para obtener todos los estudiantes activos
router.get("/estudiante/getall", async (req, res) => {
  try {
    const resultado = await Estudiante.find()
      .sort({ nombreEstudiante: 1 })
      .populate("codigoGrado", "codigoGrado nombreGrado")
      .populate("asistencias", "estado fecha")
      .populate("reportes", "motivo descripcion")
      .populate("notas", "curso año mes bloque nota");
    res.status(200).json({ resultado });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error de tipo: " + error });
  }
});

// Ruta para obtener la información de un estudiante por su ID
router.get("/estudiante/get/:id", async (req, res) => {
  try {
    const idEstudiante = req.params.id;
    const resultado = await Estudiante.findById(idEstudiante)
      .populate("asistencias", "estado fecha")
      .populate("reportes", "motivo descripcion")
      .populate({
        path: "notas",
        populate: {
          path: "curso",
          model: "Curso", // Reemplaza 'Curso' con el nombre del modelo de cursos
        },
      });

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

// Ruta para agregar notas a un estudiante
router.post("/estudiante/notas/:id", async (req, res) => {
  try {
    const estudianteId = req.params.id;
    const { cursoId, bloque, nota } = req.body;

    // Encuentra el estudiante por su ID
    const estudiante = await Estudiante.findById(estudianteId);

    if (!estudiante) {
      return res.status(404).json({ message: "Estudiante no encontrado" });
    }

    // Busca el curso en las notas del estudiante
    const cursoNota = estudiante.notas.find((nota) =>
      nota.curso.equals(cursoId)
    );

    if (cursoNota) {
      // Si el curso ya existe, agrega el bloque y la nota al subarreglo de notas
      cursoNota.notas.push({ bloque, nota });
    } else {
      // Si el curso no existe, crea un nuevo objeto de curso y notas
      const nuevoCursoNota = {
        curso: cursoId,
        notas: [
          {
            bloque,
            nota,
            año: new Date().getFullYear(),
            mes: new Date().getMonth() + 1,
          },
        ],
      };

      // Agrega el nuevo curso y notas al arreglo de notas
      estudiante.notas.push(nuevoCursoNota);
    }

    // Guarda el estudiante actualizado en la base de datos
    await estudiante.save();

    res.status(200).json({ message: "Notas agregadas exitosamente" });
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudieron agregar las notas al estudiante",
      messageSys: error.message,
    });
  }
});

module.exports = router;
