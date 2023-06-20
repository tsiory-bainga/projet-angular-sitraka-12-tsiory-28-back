var Matiere = require('../model/matiere');

// Register
function createMatiere(req, res){
    
    Matiere.create({
      nom : req.body.nom,
      nomProf : req.body.nomProf,
      photo : req.body.photo,
      photoProf: req.body.photoProf
    },
    function (err, matiere) {
      if (err) return res.status(500).send("There was a problem registering the matiere.")
      
      res.status(200).send(matiere);
    }); 
};

// RETURNS ALL THE MATIERES IN THE DATABASE
function getMatieres(req, res){
    Matiere.find({}, function (err, matieres) {
        if (err) return res.status(500).send("There was a problem finding the matieres.");
        res.status(200).send(matieres);
    });
};

// GETS A SINGLE MATIERE FROM THE DATABASE
function getMatieresById(req, res){
    Matiere.findById(req.params.id, function (err, matiere) {
        if (err) return res.status(500).send("There was a problem finding the matiere.");
        if (!matiere) return res.status(404).send("No matiere found.");
        res.status(200).send(matiere);
    });
};

// DELETES A MATIERE FROM THE DATABASE
function deleteMatiere(req, res){
    Matiere.findByIdAndRemove(req.params.id, (err, matiere) => {
        if (err) {
            res.send(err);
        }
        res.json({message: `${matiere.nom} deleted`});
    })
};

// UPDATES A SINGLE MATIERE IN THE DATABASE
function updateMatiere(req, res){
    Matiere.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, matiere) {
        if (err) return res.status(500).send("There was a problem updating the matiere.");
        res.status(200).send(matiere);
    });
};

module.exports = { createMatiere, getMatieres, getMatieresById, deleteMatiere, updateMatiere };
