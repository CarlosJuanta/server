const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const estudianteSchema = new Schema({
    cuiEstudiante: {
        type: String,
        required: true, // Puedes hacerlo requerido si es necesario
        unique: true, // Puedes hacerlo único si es necesario
    },
    nombreEstudiante: String,
    apellidoEstudiante: String,
    fechanacEstudiante: String,
    direccionEstudiante: String,
    nacionalidadEstudiante: String,
    codigomineducEstudiante: String,
    cuiencargadoEstudiante: String,
    nombreencargadoEstudiante: String,
    apellidoencargadoEstudiante: String,
    direccionencargadoEstudiante: String,
    telefonoencargadoEstudiante: String,
    correencargadoEstudiante: String,
    codigoGrado: [{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Grado',
       }],
    estadoEstudiante: { default: true, type: Boolean },
    asistencias: [{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Asistencia',
      }], 
    reportes: [{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Reporte',
      }],
      notas: [
        {
          curso: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Curso", // Reemplaza 'Curso' con el nombre del modelo de cursos
          },
          notas: [
            {
              bloque: Number,
              nota: Number,
              año: Number,
              mes: Number,
            },
          ],
         
          // Puedes agregar más campos de notas si es necesario, como nota2, nota3, etc.
        },
      ],
});

module.exports = mongoose.model("Estudiante", estudianteSchema);