const bcrypt = require('bcrypt')
const User = require('../models/User')


module.exports = (req, res) => {
  const { username, password } = req.body;

  req.flash('Username',username)
  req.flash('Password',password)
  
  User.findOne({ username: username }, (error, user) => {

    
    if (user) {
      bcrypt.compare(password, user.password, (error, same) => {  

      
        if (same) {
          // if passwords match
         req.session.userId = user._id


          res.redirect("/");
        } else {
          const wrongPassword = "wroung password"
           req.flash('wrongpassword',wrongPassword)
          console.log("looking")
          res.redirect("/auth/login");
        }
      });
    } else {
     const worngUsername = "wroung username"
      req.flash('worngusername',worngUsername)
       console.log("working")
      res.redirect("/auth/login");
    }
  });
};
