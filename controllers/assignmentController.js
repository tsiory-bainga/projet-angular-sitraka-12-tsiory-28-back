let Assignment = require('../model/assignment');

// Récupérer tous les assignments (GET)
function getAssignmentsSansPagination(req, res){
    Assignment.find((err, assignments) => {
        if(err){
            res.send(err)
        }

        res.send(assignments);
    });
}

function getAssignmentsRendu(req, res) {
    Assignment.find({ rendu: true }, (err, assignments) => {
        if (err) {
            res.send(err);
        } else {
            res.send(assignments);
        }
    });
}

function getAssignmentsNonRendu(req, res) {
    Assignment.find({ rendu: false }, (err, assignments) => {
        if (err) {
            res.send(err);
        } else {
            res.send(assignments);
        }
    });
}

function getAssignments(req, res) {
    var aggregateQuery = Assignment.aggregate();
    
    Assignment.aggregatePaginate(aggregateQuery,
      {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
      },
      (err, assignments) => {
        if (err) {
          res.send(err);
        }
        res.send(assignments);
      }
    );
   }
   
// Récupérer un assignment par son id (GET)
function getAssignment(req, res){
    let assignmentId = req.params.id;

    Assignment.findById(assignmentId, (err, assignment) =>{
        if(err){res.send(err)}
        res.json(assignment);
    })
}

// Ajout d'un assignment (POST)
function postAssignment(req, res){
    Assignment.create({
        photoAuteur: req.body.photoAuteur,
        titre: req.body.titre,
        nomAuteur: req.body.nomAuteur,
        matiere: req.body.matiere,
        dateRendu: req.body.dateRendu,
        rendu: req.body.rendu,
        note: req.body.note,
        remarque: req.body.remarque,
    },
    function (err, matiere) {
        if (err) return res.status(500).send("There was a problem registering the assignment.")
        
        res.status(200).send(matiere);
    });
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    console.log("UPDATE recu assignment : ");
    console.log(req.body);
    
    Assignment.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, assignment) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
          res.json({message: assignment.nom + 'updated'})
        }

      // console.log('updated ', assignment)
    });

}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {

    Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
        if (err) {
            res.send(err);
        }
        res.json({message: `${assignment.nom} deleted`});
    })
}



module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment, getAssignmentsRendu, getAssignmentsNonRendu };
