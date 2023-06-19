var User = require('../model/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

// Register
function register(req, res){
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    
    User.create({
      name : req.body.name,
      email : req.body.email,
      password : hashedPassword
    },
    function (err, user) {
      if (err) return res.status(500).send("There was a problem registering the user.")
      
      res.status(200).send(user);
    }); 
};

// Login
function login(req, res){

    User.findOne({ email: req.body.email }, function (err, user) {
      if (err) return res.status(500).send('Error on the server.');
      if (!user) return res.status(404).send('No user found.');
      
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
      
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      
      res.status(200).send({ auth: true, token: token });
    });
    
};

// Logout
function logout(req, res){
    res.status(200).send({ auth: false, token: null });
};

// RETURNS ALL THE USERS IN THE DATABASE
function getUsers(req, res){
    User.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
};

// GETS A SINGLE USER FROM THE DATABASE
function getUsersById(req, res){
    User.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
};

// DELETES A USER FROM THE DATABASE
function deleteUser(req, res){
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User: "+ user.name +" was deleted.");
    });
};

// UPDATES A SINGLE USER IN THE DATABASE
function updateUser(req, res){
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
};

module.exports = { register, login, logout, getUsers, getUsersById, deleteUser, updateUser };
