var express = require('express');
let assignment = require('../controllers/assignments');
let user = require('../controllers/users');
var User = require('../model/user');
var VerifyToken = require('../verifyToken');
const router = express.Router();
 
router.route('/assignments')
  .get(assignment.getAssignments)
  .post(assignment.postAssignment)
  .put(assignment.updateAssignment);

router.route('/assignments/:id')
  .get(assignment.getAssignment)
  .delete(assignment.deleteAssignment);

router.route('/users')
    .get(user.getUsers)

router.route('/register')
    .post(user.register)

router.route('/login')
    .post(user.login)

router.get('/me', VerifyToken, function(req, res, next) {

    User.findById(req.userId, { password: 0 }, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        
        res.status(200).send(user);
    });
    
});
      

router.route('/logout')
    .get(user.logout)


router.route('/users/:id')
  .get(user.getUsersById)
  .delete(user.deleteUser)
  .put(user.updateUser);
 
module.exports = router;