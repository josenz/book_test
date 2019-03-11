var mongoose   = require("mongoose");
var Campground = require("./models/campground");
var Comment    = require("./models/comment");


var data = [
    {
      name: "First Mountain",
      image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg",
      description: "Suspendisse vitae semper dui, nec blandit tellus. Donec ornare feugiat metus, ac imperdiet ligula consequat id. Vestibulum a turpis quis mauris aliquet bibendum eu eget mauris. Sed elit purus, blandit a risus ut, mattis consectetur enim."
    },
    {
      name: "Bright Night",
      image: "https://farm9.staticflickr.com/8002/7299820870_e78782c078.jpg",
      description: "Suspendisse vitae semper dui, nec blandit tellus. Donec ornare feugiat metus, ac imperdiet ligula consequat id. Vestibulum a turpis quis mauris aliquet bibendum eu eget mauris. Sed elit purus, blandit a risus ut, mattis consectetur enim."
    },
    {
      name: "Beyond the Horizon",
      image: "https://farm6.staticflickr.com/5110/5681060740_168631c164.jpg",
      description: "Suspendisse vitae semper dui, nec blandit tellus. Donec ornare feugiat metus, ac imperdiet ligula consequat id. Vestibulum a turpis quis mauris aliquet bibendum eu eget mauris. Sed elit purus, blandit a risus ut, mattis consectetur enim. In dignissim sodales nisi, eu molestie ipsum aliquam eu. Ut facilisis pellentesque augue non aliquam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
    }
];


function seedDB() {
  Campground.remove({}, function(err){
    if(err){
        console.log(err);
    } else {
      console.log("All Campgrounds were deleted!");
      data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
          if(err){
              console.log(err);
          } else {
          //   console.log(data);
            Comment.create({
                    text: "This place is great, but I wish there was internet!",
                    author: "John"
            }, function(err, comment){
                  if(err){
                      console.log(err);
                   } else {
                   //   console.log(com);
                      campground.comments.push(comment);
                      campground.save();
                      console.log(campground);
                  }
            });
         }
        });
      });
   }
  });
};




module.exports = seedDB;

