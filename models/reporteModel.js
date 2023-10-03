const mongoose = require('mongoose');
const reporteSchema = new mongoose.Schema({
  motivo: {
    type: String,
    required: true, // Puedes hacerlo requerido si es necesario
   },
  descripcion: String,
});

module.exports = mongoose.model('Reporte', reporteSchema);