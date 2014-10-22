var mongoose = require('mongoose');
var User = mongoose.model('User');
var ObjectId = require('mongoose').Types.ObjectId;
var fs = require('fs');
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
         res.json({message: "Error occured while saving"});
      else
         res.json({message: "saved successfully"});
   });
};

exports.getAll = function(req,res){
	User.find(function(err,users){
		if(err){
			res.send(err);
		}else{
			res.json(users);
		}
	});
};

exports.get = function(req,res){
	var id ;
	try{
	    req.params.user_id = '542674bf6f3f913d70a8e6d0';
	   id = new ObjectId(req.params.user_id);
	   User.findById(id,function(err,user){
		if(err){
			res.send(err);
		}
		res.json(user);
	});
	}catch(e){
	   
	   res.send(404);
	}
	/*
	User.find({_id:id}).exec(function(err,user){
		if(err || user.length ==0){
			res.send("Error occured");
		}
		res.json(user);
	});

	User.findById(id,function(err,user){
		if(err){
			res.send(err);
		}
		res.json(user);
	});*/
	
};


exports.getSettings = function(req,res){
    try{
        var id = new ObjectId(req.params.id);
        User.findById(id,function(err,user){
		if(err){
			res.send(err);
		}else{
            res.render('settings.ejs',{
                title: 'Settings',
                user: user,
                path: '../../',
                urlPath: '/user'
            });
        }
        });
	   
    }catch(e){
            res.send(404);
    }
};


exports.saveSettings = function(req,res){
    try{
        var id = new ObjectId(req.params.id);
        User.findById(id,function(err,user){
		if(err){
			res.send(err);
		}
        user.displayName = req.body.displayName;
        user.local.email = req.body.email;
        req.user = user;
        user.save(function(err){
            if(err)
                res.send(err);
             res.render('settings.ejs',{
                title: 'Settings',
                user: user,
                path: '../../',
                urlPath: '/user'
            });
        }); 
        });
    }catch(e){
        res.send(404);
    }
};

exports.uploadProfilePic = function(req,res){
    // get the temporary location of the file
    console.log('####### files:'+req.body.userPhoto);
    var tmp_path = req.files.userPhoto.path;
    // set where the file should actually exists - in this case it is in the "images" directory
    var target_path = '/Users/narendra/Documents/Workspaces/NodeExpressWorkspace/MongoExpressUploads/profile_pic/' + req.files.userPhoto.name;
    // move the file from the temporary location to the intended location
    fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
        fs.unlink(tmp_path, function() {
            if (err) {
                throw err;
            }else{
                //  res.send('File uploaded to: ' + target_path + ' - ' + req.files.thumbnail.size + ' bytes');
                var id = new ObjectId(req.user._id);
                User.findById(id,function(err,user){
                    if(err){
                        res.send(err);
                    }
                    user.profile_pic = req.files.userPhoto.name;
                    req.user = user;
                    user.save(function(err){
                        if(err)
                            res.send(err);
                            res.render('settings.ejs',{
                                title: 'Settings',
                                user: user,
                                path: '../../',
                                urlPath: '/user'
                            });
                        });
                });
             };
            });
        });
  };


exports.update = function(req,res){
	var id ;
	try{
	    req.params.user_id = '542674bf6f3f913d70a8e6d0';
	   id = new ObjectId(req.params.user_id);
	   User.findById(id,function(err,user){
		if(err){
			res.send(err);
		}
		//user.username = req.body.username;
		user.username = "narendra1";

		//user.email = req.body.email;
		user.email = "narendrasoninewemail@gmail.com";

		//user.name = req.body.name;
		user.name = "Narendra Soni";

		user.save(function(err){
			if(err)
			    res.send(err);
			res.json({message: "user  Updated successfully"});
		});
	});
	}catch(e){
	   res.send(404);
	}
};

exports.delete = function(req,res){
	var id ;
	try{
	   req.params.user_id = '542671276b727c766f8f0310';
	   id = new ObjectId(req.params.user_id);
	   User.remove({_id:id},function(err,user){
	   	 console.log('checkpoint 4'); 
		if(err){
		   console.log("Error is:"+ err);
		   res.send(err);
		}
	        res.json({message: "User deleted successfully"});
	   });
	}catch(e){
	   res.send(404);
	} 
};
