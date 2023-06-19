var mongoose = require('mongoose');  
var MatiereSchema = new mongoose.Schema({  
  nom: String,
  nomProf: String,
  photo: String,
  photoProf: String,
});
mongoose.model('matiere', MatiereSchema);

module.exports = 
module.exports = mongoose.model('matiere');