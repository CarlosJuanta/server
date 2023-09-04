const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const estudianteSchema = new Schema({
    cuiEstudiante: String,
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
    estadoEstudiante: { default: true, type: Boolean },
});

module.exports = mongoose.model("Estudiante", estudianteSchema);