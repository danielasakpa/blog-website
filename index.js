const mySecret = process.env["MONGO_URL"];
const express = require("express");
const expressSession = require("express-session");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

dotenv.config();

// use mongooes to connect to the database
mongoose.connect(process.env.MONGO_URL, () => {
  console.log("mong connected");
});

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(fileUpload());

app.use(
  expressSession({
    secret: "keyboard cat"
  })
);

app.use(express.static("public"));

app.set("view engine", "ejs");

// importing request handlers functions
const { newPostController, searchController } = require("./controllers/static");
const newUserController = require("./controllers/newUser");
const storeUserController = require("./controllers/storeUser");
const loginController = require("./controllers/login");
const loginUserController = require("./controllers/loginUser");
const logoutController = require("./controllers/logout");
const homeController = require("./controllers/home");
const storePostController = require("./controllers/storePost");
const getPostController = require("./controllers/getPost");

app.use(flash());

global.loggedIn = null;

app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  next();
});

// using Validation Middleware to check if all field in the create post from are filled.
const validateMiddleWare = require("./middleware/validationMiddleware.js");

const authMiddleware = require("./middleware/authMiddleware.js");

const redirectIfAuthenticatedMiddleware = require("./middleware/redirectIfAuthenticatedMiddleware");

app.use("/posts/store", validateMiddleWare);

// handles a get request from the /auth/register

app.get("/auth/register", redirectIfAuthenticatedMiddleware, newUserController);

app.post(
  "/users/register",
  redirectIfAuthenticatedMiddleware,
  storeUserController
);

app.get("/auth/login", redirectIfAuthenticatedMiddleware, loginController);

app.post(
  "/users/login",
  redirectIfAuthenticatedMiddleware,
  loginUserController
);

app.get("/auth/logout", logoutController);

// handles a get request from the home route

app.get("/", homeController);

// to render the create page in the /posts/new route
app.get("/posts/new", authMiddleware, newPostController);

// using the route parameters to handle a get request to a specific post route
app.get("/post/:id", getPostController);

// handles a get request from the /posts/store

app.post("/posts/store", authMiddleware, storePostController);

// handles a get request from the /posts/search

app.post("/post/search", searchController);

app.use((req, res) => res.render("notfound"));

// const BlogPost = require("./models/BlogPost.js");

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

// listening to port 3000
app.listen(3000, () => {
  console.log("App listening on port 3000");
});
