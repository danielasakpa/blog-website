// Registering Validation Middleware to check if all field in the create post from are filled.
module.exports = (req,res,next) =>{
if(req.files == null || req.body.title == '' || req.body.body == ''){
  const Post = 'Incomplete post'
      req.flash('Post',Post)       
  return res.redirect('/posts/new')
}
next()
}