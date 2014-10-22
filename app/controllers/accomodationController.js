
var mongoose = require('mongoose');
var Accomodation = mongoose.model('Accomodation');
var ObjectId = require('mongoose').Types.ObjectId;
exports.create = function(req,res){
    var accomodation = new Accomodation({
        "title"   : req.body.title,
        "user_id" : req.user._id,
        "body" :  req.body.body,
        "accomodationType": req.body.accomodationType
    });
    
    blog.save(function(err){
        if(err)
            res.json({message: "Error occured while saving"});
        else{
            res.redirect('/accomodation');
        }    
    });
};

exports.getAll = function(req,res){
    Accomodation.find(function(err,accomodations){
        if(err){
            	res.render('accomodation/accomodation.ejs', {
				accomodations: [],
			    title: 'Accomodations',
                path: '../',
                urlPath: '/accomodation',  
			    user : req.user // get the user out of session and pass to template
               
		});
        }else{
            //res.json(blogs);
		res.render('accomodation/accomodation.ejs', {
			accomodations: accomodations,
			title: 'Accomodations',
            path: '../',
            urlPath: '/accomodation',
			user : req.user // get the user out of session and pass to template
		});
        }
    });
};
exports.createNew = function(req,res,next){
        res.render('accomodationNew.ejs', {
            title: 'Accomodations',
            user : req.user // get the user out of session and pass to template
        });
};


exports.get = function(req,res){
    var id ;
    try{
        id = new ObjectId(req.params.id);
        Accomodation.findById(id,function(err,accomodation){
            if(err){
                res.send(err);
            }else{
                //res.json(blog);
                res.render('blog.ejs', {
                    accomodation: accomodation,
                    user : req.user, 
                    title: 'Accomodation Description',
                    moment: moment
               });
          }
        });
    }catch(e){

        res.send(404);
    }
};


exports.update = function(req,res){
    var id ;
    try{
        id = new ObjectId(req.params.accomodation_id);
        Accomodation.findById(id,function(err,accomodation){
            if(err){
                res.send(err);
            }

            accomodation.save(function(err){
                if(err)
                    res.send(err);
                res.json({message: "Accomodation Post Updated successfully"});
            });
        });
    }catch(e){
        res.send(404);
    }
};

exports.delete = function(req,res){
    var id ;
    try{
        id = new ObjectId(req.params.accomodation_id);
        Accomodation.remove({_id:id},function(err,accomodation){
            if(err){
                res.send(err);
            }
            res.json({message: "Accomodation deleted successfully"});
        });
    }catch(e){
        res.send(404);
    } 
};

