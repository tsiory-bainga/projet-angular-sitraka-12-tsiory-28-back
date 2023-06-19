let mongoose = require('mongoose');
let Schema = mongoose.Schema;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const matiere = require('./matiere');

let AssignmentSchema = Schema({
    photoAuteur: String,
    titre: String,
    nomAuteur: String,
    matiere: matiere.schema,
    dateRendu: Date,
    rendu: Boolean,
    note: Number,
    remarque: String
});

AssignmentSchema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
// le nom de la collection (par défaut assignments) sera au pluriel, 
// soit assignments
// Si on met un nom "proche", Mongoose choisira la collection
// dont le nom est le plus proche
module.exports = mongoose.model('assignments', AssignmentSchema);
