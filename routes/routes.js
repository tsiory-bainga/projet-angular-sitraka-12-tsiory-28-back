var express = require('express');
let assignment = require('../controllers/assignmentController');
let user = require('../controllers/userController');
let matiere = require('../controllers/matiereController')
var User = require('../model/user');
var VerifyToken = require('../verifyToken');
const router = express.Router();
 
router.route('/assignments')
  .get(assignment.getAssignments)
  .post(assignment.postAssignment)
  .put(assignment.updateAssignment);

router.route('/assignmentsRendu')
  .get(assignment.getAssignmentsRendu)

router.route('/assignmentsNonRendu')
  .get(assignment.getAssignmentsNonRendu)

router.route('/assignments/:id')
  .get(assignment.getAssignment)
  .put(assignment.updateAssignment)
  .delete(assignment.deleteAssignment);


router.route('/register')
    .post(user.register)

router.route('/login')
    .post(user.login)

// router.get('/me', VerifyToken, function(req, res, next) {

//     User.findById(req.userId, { password: 0 }, function (err, user) {
//         if (err) return res.status(500).send("There was a problem finding the user.");
//         if (!user) return res.status(404).send("No user found.");
        
//         res.status(200).send(user);
//     });
    
// });
      
 
router.route('/matieres')
  .get(matiere.getMatieres)
  .post(matiere.createMatiere);

router.route('/matieres/:id')
  .get(matiere.getMatieresById)
  .delete(matiere.deleteMatiere)
  .put(matiere.updateMatiere);


module.exports = router;