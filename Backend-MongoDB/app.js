const express = require("express");
const bodyParser = require("body-parser");
const methodOveride = require("method-override");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("./config/keys");
const passport = require("passport");
const cors = require("cors");
const apiRoutes = require("./api");
const mongoose = require("mongoose");
const mlab_db = "mongodb+srv://root:root1234@cluster0.rfnnp.mongodb.net/SplitwiseDB?retryWrites=true&w=majority";

const app = express();
// app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOveride("_method"));
//use cors to allow cross origin resource sharing
app.use(cors({ origin: "http://ec2-52-15-69-100.us-east-2.compute.amazonaws.com:3000", credentials: true }));
app.use("/api", apiRoutes);
app.use(passport.initialize());
//Passport config
require("./config/passport")(passport);
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://ec2-52-15-69-100.us-east-2.compute.amazonaws.com:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  // res.setHeader('Cache-Control', 'no-cache');
  next();
});

mongoose
  .connect(mlab_db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

var db = mongoose.connection;
if(!db)
  console.log("Error connecting to db");
else
  console.log("Db connected successfully");

// Setup an express server and define port to listen all incoming requests for this application
const setUpExpress = () => {
  const port = process.env.APP_PORT || 3001;

  app.listen(port, () => {
    console.log(`Example app listening at http://ec2-52-15-69-100.us-east-2.compute.amazonaws.com:${port}`);
  });
};

setUpExpress();