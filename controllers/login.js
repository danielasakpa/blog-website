module.exports = (req, res) =>{
res.render('login', {
   worngUsername: req.flash('worngusername'),
   wrongPassword: req.flash('wrongpassword'),
   Username: req.flash('Username'),
   Password: req.flash('Password')
  })
}
