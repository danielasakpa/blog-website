
exports.newPostController = (req, res) => {
  res.render("create");
};

exports.searchController = (req, res) => {
  console.log(req.body.searchTitle);
  searchTitle = req.body.searchTitle;
    // redirect to the home page
  res.redirect("/search");
}
