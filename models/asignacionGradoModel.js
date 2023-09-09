const mongoose = require('mongoose');
const asignacionGradoSchema = new mongoose.Schema({
  codigoGrado: [{
    type: mongoose.Schema.Types.ObjectID,
    ref: 'Grado',
   }],
   cuiEstudiante: [{    
    type: mongoose.Schema.Types.ObjectID,
    ref: 'Estudiante',
    }], 
});

module.exports = mongoose.model('AsignacionGrado', asignacionGradoSchema);