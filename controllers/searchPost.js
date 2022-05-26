const BlogPost = require("../models/BlogPost.js");

// handles a post request to the /posts/search route and get the req.body obj which is ued to get the imput from the text field and assign it to searchTitle

module.exports = async (req, res) => {
  // create a new regx from the searchTitle variable and i modifier specifies a case-insenitive match
  
  searchQuery = new RegExp(searchTitle,'i')

// checks if the if the text field is filled then perform the search Query
  
  if (searchTitle.length >= 1) {
    const blogposts = await BlogPost.find({ title: searchQuery });
    res.render("search", {
      blogposts,
    });
  } else {
    res.redirect("/");
  }
}