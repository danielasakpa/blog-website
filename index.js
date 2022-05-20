const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const BlogPost = require("./models/BlogPost.js");

dotenv.config();

mongoose.connect(process.env.MONGO_URL, () => {
  console.log("mong connected");
});

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(fileUpload());

app.use(express.static("public"));

app.set("view engine", "ejs");

let searchTitle = "";

app.get("/", async (req, res) => {
  const blogposts = await BlogPost.find({});
  res.render("index", {
    blogposts,
  });
});

app.get("/search", async (req, res) => {
  
  searchQuery = new RegExp(searchTitle,'i')
  
  if (searchTitle.length >= 1) {
    const blogposts = await BlogPost.find({ title: searchQuery });
    res.render("search", {
      blogposts,
    });
  } else {
    res.redirect("/");
  }
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/post/:id", async (req, res) => {
  const blogposts = await BlogPost.findById(req.params.id);
  res.render("post", {
    blogposts,
  });
});

app.get("/posts/new", (req, res) => {
  res.render("create");
});

app.post("/posts/store", (req, res) => {
  let image = req.files.image;
  image.mv(
    path.resolve(__dirname, "public/assets/img", image.name),
    async (error) => {
      await BlogPost.create({
        ...req.body,
        image: "/assets/img/" + image.name,
      });
    }
  );
  res.redirect("/");
});

app.post("/post/search", (req, res) => {
  console.log(req.body.searchTitle);
  searchTitle = req.body.searchTitle;
  res.redirect("/search");
});

//  BlogPost.find({}, (error, blogposts) =>{
//    blogposts.forEach(x => {
//      BlogPost.findByIdAndDelete(x.id, (error, blogposts) =>{
//       console.log(error,blogposts)
//       })
//    })
// })

// BlogPost.find({}, (error, blogposts) =>{
// console.log(error,blogposts)
// })

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
