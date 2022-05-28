const BlogPost = require("../models/BlogPost.js");

// using the route parameters to a handle a get request to a specific post route and then render the post based on the id

module.exports = async (req, res) => {
  const blogposts = await BlogPost.findById(req.params.id).populate('userid');
  res.render("post", {
    blogposts,
  });
}