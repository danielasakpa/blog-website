const BlogPost = require("../models/BlogPost.js");
const path = require("path");

// handles a post request to the /posts/store route and get the res.body obj which is the use to create a new post

module.exports = (req, res) => {
  // get and save the image file with original name to the img directory

  let image = req.files.image;
  image.mv(
    path.resolve(__dirname, "../public/assets/img", image.name),
    async (error) => {
      await BlogPost.create({
        ...req.body,
        image: "/assets/img/" + image.name,
        userid: req.session.userId
      });
    }
  );
  // redirect to the home page
  res.redirect("/");
};
