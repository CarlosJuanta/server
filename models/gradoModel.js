const mongoose = require('mongoose');
const gradoSchema = new mongoose.Schema({
  codigoGrado: {
    type: String,
    required: true, // Puedes hacerlo requerido si es necesario
    unique: true, // Puedes hacerlo único si es necesario
  },
  nombreGrado: String,
  descripcionGrado: String,
  seccionGrado: String,
  cuiDocente: [{
    type: mongoose.Schema.Types.ObjectID,
    ref: 'Docente',
   }],
});

module.exports = mongoose.model('Grado', gradoSchema);

