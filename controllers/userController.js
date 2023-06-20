var User = require('../model/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

// Register
function register(req, res){
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    
    User.create({
      username : req.body.username,
      password : hashedPassword,
      admin: req.body.admin
    },
    function (err, user) {
      if (err) return res.status(500).send("There was a problem registering the user.")
      
      res.status(200).send(user);
    }); 
};

// Login
function login(req, res){

    User.findOne({ username: req.body.username }, function (err, user) {
      if (err) return res.status(500).send('Error on the server.');
      if (!user) return res.status(404).send('No user found.');
      
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send("Wrong Password");
   
      res.status(200).send(
        {
            username : user.username,
            isAdmin : user.admin
        });
    });
    
};
module.exports = { register, login };
