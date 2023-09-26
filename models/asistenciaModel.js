const mongoose = require('mongoose');
const asistenciaSchema = new mongoose.Schema({
  estado: {
    type: Boolean,
    required: true, // Puedes hacerlo requerido si es necesario
   },
  fecha: String,
});

module.exports = mongoose.model('Asistencia', asistenciaSchema);