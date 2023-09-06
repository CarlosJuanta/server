const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const docenteSchema = new Schema({
  cuiDocente: {
    type: String,
    required: true,
    unique: true,
  },
  nombreDocente: String,
  apellidoDocente: String,
  telefonoDocente: Number,
  correoDocente: String,
  direccionDocente: String,
  nacionalidadDocente: String,
  estadoDocente: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('Docente', docenteSchema);


