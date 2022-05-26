const mySecret = process.env['MONGO_URL']
const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
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

app.use(express.static("public"));

app.set("view engine", "ejs");

// importing request handlers functions
const { newPostController, searchController} = require('./controllers/static')
const newUserController = require('./controllers/newUser')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const searchPostController = require('./controllers/searchPost')




// using Validation Middleware to check if all field in the create post from are filled.
const validateMiddleWare = require('./middleware/validationMiddleware.js')
  
app.use('/posts/store',validateMiddleWare)

// holds the value from the search text field
let searchTitle = "";

// handles a get request from the /auth/register

app.get("/auth/register",newUserController);

// handles a get request from the home route

app.get("/",homeController);

// handles a get request from the /search

app.get("/search",searchController);

// to render the create page in the /posts/new route
app.get("/posts/new",newPostController);

// using the route parameters to handle a get request to a specific post route
app.get("/post/:id",getPostController);

// handles a get request from the /posts/store 

app.post("/posts/store",storePostController);

// handles a get request from the /posts/search 

app.post("/post/search", searchPostController);



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
