// Registering Validation Middleware to check if all field in the create post from are filled.
module.exports = (req,res,next) =>{
if(req.files == null || req.body.title == null || req.body.title == null){
return res.redirect('/posts/new')
}
next()
}