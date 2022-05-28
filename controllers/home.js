const BlogPost = require("../models/BlogPost.js");

//  handles a get request from the home route and collect the posts from the database which is the render on the page

module.exports = async (req, res) => {
  const blogposts = await BlogPost.find({}).populate('userid');;
  console.log(req.session)
  res.render("index", {
    blogposts
  });
};
