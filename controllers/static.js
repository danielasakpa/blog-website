const BlogPost = require("../models/BlogPost.js");

exports.newPostController = (req, res) => {
  
  if(req.session.userId){
  return res.render("create", {
    Post: req.flash("Post"),
  });
  }
  res.redirect('/auth/login')
};



exports.searchController = async (req, res) => {

  let payload = req.body.payload.trim()


 let search = await BlogPost.find({title: {$regex: new RegExp('^'+ payload +'.*','i' )}}).exec()

  search = search.slice(0, 5);

  res.send({payload: search})

  
 //  console.log(req.body.searchTitle);
 // const searchTitle = req.body.searchTitle;
  
 //    // create a new regx from the searchTitle variable and i modifier specifies a case-insenitive match
  
 //  searchQuery = new RegExp(searchTitle,'i')

 //    if (searchTitle.length >= 1) {
 //    const blogposts = await BlogPost.find({ title: searchQuery });
 //    res.render("search", {
 //      blogposts,
 //    });
 //  } else {
 //    res.redirect("/");
 //  }
}
