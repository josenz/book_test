var express = require("express");
var route = express.Router();
var passport = require("passport");
var User  = require("../models/user");

// Root Route
route.get("/", function(req, res) {
  res.render("landing"); 
});

// SHOW REGISTER FORM
route.get("/register", function(req, res){
   res.render("register"); 
});

// handle sign up logic
route.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

// show login form
route.get("/login", function(req, res){
   res.render("login");     
});

// handle login form
route.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "login",    
        failureFlash: true
    }), function(req, res){
});

// LOGOUT ROUTE
route.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});

module.exports = route;