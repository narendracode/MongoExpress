exports.isLoggedIn = function(req, res, next) {
    // if user is authenticated in the session, carry on 
    console.log('is loggedin is called.. ');
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
};

exports.selfLoggedIn = function(req, res, next) {
    //if user tried to edit someone else's profile, will be redirected to /profile
    console.log('is selfLoggedIn is called.. ');
    if(req.params.id == req.user._id)
         return next();
    
    res.redirect('/profile');
};