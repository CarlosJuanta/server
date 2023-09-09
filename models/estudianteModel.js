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
    
});

module.exports = mongoose.model("Estudiante", estudianteSchema);