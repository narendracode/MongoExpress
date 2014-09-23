var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.create = function(req,res){
   var user = new User({
      name:"Narendra",
      email:"narendrasoni2@gmail.com",
      username: "narendrasoni1989",
      provider: "provider value",
      hashed_password: "#$#$#$#$#$#"
   });

   user.save(function(err){
      if(err)
         res.send("Error occured while saving:"+err);
      else
         res.send("saved successfully");
   });
};
