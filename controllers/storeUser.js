const User = require("../models/User.js");
const path = require("path");

User.find({}, (error, blogspot) =>{
console.log(error,blogspot)
})



module.exports = (req, res) => {
  User.create(req.body, (error, user) => {
    if (error) {
     const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message);

      req.flash('data',req.body)

     req.flash('validationErrors',validationErrors)
      
     return res.redirect("/auth/register");

    }
    res.redirect("/auth/login");
  });
};
