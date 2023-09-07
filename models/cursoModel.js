const mongoose = require('mongoose');
const cursoSchema = new mongoose.Schema({
  codigoCurso: {
    type: String,
    required: true, // Puedes hacerlo requerido si es necesario
    unique: true, // Puedes hacerlo único si es necesario
  },
  nombreCurso: String,
  descripcionCurso: String,
  codigoGrado: [{
    type: mongoose.Schema.Types.ObjectID,
    ref: 'Grado',
   }],
});

module.exports = mongoose.model('Curso', cursoSchema);
