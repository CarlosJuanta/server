const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const docenteSchema = new Schema({
  cuiDocente: String,
  nombreDocente: String,
  apellidoDocente: String,
  telefonoDocente: Number,
  correoDocente: String,
  direccionDocente: String,
  nacionalidadDocente: String,
  estadoDocente: { default: true, type: Boolean },
});

module.exports = mongoose.model("Docente", docenteSchema);
