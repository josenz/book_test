var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

// INDEX - SHOW ALL CAMPGROUNDS
router.get("/", function(req, res){
    Campground.find({}, function(err, allCampgrounds) {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

// CREAT - ADD NEW CAMPGROUND TO DB
router.post("/", middleware.isLoggedIn, function(req, res) {
    // get data from form and add to campgrounds array
     var name = req.body.name;
     var image = req.body.image;
     var desc = req.body.description;
     var author = {id: req.user._id, username: req.user.username};
     var newCampground = {name: name, image: image, description: desc, author: author};
    Campground.create(newCampground, function(err, createdCg){
        if(err) {
            console.log(err);
        } else {
            console.log(createdCg);
            res.redirect("/campgrounds");
        }
    });
});

// NEW - SHOW FORM TO CREATE NEW CAMPGROUND
router.get("/new", middleware.isLoggedIn, function(req, res) {
   res.render("campgrounds/new");
});

// SHOWS INFO ABOUT ONE ITEN
router.get("/:id", function(req, res) {
//   res.send("THIS WILL BE THE SHOW PAGE ONE DAY!");
    var id = req.params.id;
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err) {
           console.log(err);
       } else {
           res.render("campgrounds/show", {campground: foundCampground});
       }
   });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit" , middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
       } else {
           res.render("campgrounds/edit", {campground: campground});
       }
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err){
       if(err){
           console.log(err);
           res.redirect("/campgrounds")
       } else {
           res.redirect("/campgrounds/" + req.params.id);
       }
   });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/campgrounds");
      }  else {
          res.redirect("/campgrounds");
      }
   });
});


module.exports = router;
