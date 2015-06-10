var mongoose = require('mongoose');

// create a schema
var userSchema = new mongoose.Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: Boolean,
  location: String,
/*  meta: {
    age: Number,
    website: String
  },
  created_at: Date,
  updated_at: Date*/
});

// the schema is useless so far
// we need to create a model using it
var model = mongoose.model('Users', userSchema);



exports.findAll = function(req, res) {
    model.find({}, function(err, users){
    if(err) res.send(err);
    else res.json(users);
  });

};

exports.findByUserName = function(req, res) {

  model.findOne({_name:req.params.name}, function(err, user){
    if(err) res.send(err);
    else res.json(user);
  });

};

exports.AddUser = function(req, res) {
  //console.log('Adding new user: '+req.body.username);

  var newUser = new model(req.body);
  newUser.save(function (err) {
    if (err) res.send('NOK: '+err);
    else res.send('OK '+newUser.id);
  });  

};
