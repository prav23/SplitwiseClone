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
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use("/api", apiRoutes);
app.use(passport.initialize());
//Passport config
require("./config/passport")(passport);
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
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

// const models = require("./models");
// // Load User model
// const User = require("./models/User");
// // Load Profile Model
// const Profile = require("./models/Profile");


// app.post("/register", function(req, res) {
//   const errors = {};
//   User.findOne({ email: req.body.email }).then(user => {
//     if (user) {
//       errors.email = "Email already exists";
//       return res.status(400).json(errors);
//     } else {
//       const newUser = new User({
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password
//       });

//       bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(newUser.password, salt, (err, hash) => {
//           if (err) throw err;
//           newUser.password = hash;
//           newUser
//             .save()
//             .then(user => res.json(user))
//             .catch(err => console.log(err));
//         });
//       });
//     }
//   });
// });

// app.post("/login", (req, res) => {

//   const email = req.body.email;
//   const password = req.body.password;
//   const errors = {};
//   // Find user by email
//   User.findOne({ email }).then(user => {
//     // Check for user
//     if (!user) {
//       errors.email = "User not found";
//       return res.status(404).json(errors);
//     }

//     // Check Password
//     bcrypt.compare(password, user.password).then(isMatch => {
//       if (isMatch) {
//         // User Matched
//         const payload = { id: user.id, name: user.name }; // Create JWT Payload

//         // Sign Token
//         jwt.sign(
//           payload,
//           keys.secretOrKey,
//           { expiresIn: 3600 },
//           (err, token) => {
//             res.json({
//               success: true,
//               token: "Bearer " + token
//             });
//           }
//         );
//       } else {
//         errors.password = "Password incorrect";
//         return res.status(400).json(errors);
//       }
//     });
//   });
// });

// app.post(
//   "/profile",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     // Get fields
//     const profileFields = {};
//     profileFields.user = req.user.id;
//     if (req.body.image) profileFields.image = req.body.image;
//     if (req.body.phonenumber) profileFields.phonenumber = req.body.phonenumber;
//     if (req.body.currency) profileFields.currency = req.body.currency;
//     if (req.body.language) profileFields.language = req.body.language;
//     if (req.body.timezone) profileFields.timezone = req.body.timezone;
    
//     Profile.findOne({ user: req.user.id }).then(profile => {
//       if (profile) {
//         // Update
//         console.log("checking update");
//         Profile.findOneAndUpdate(
//           { user: req.user.id },
//           { $set: profileFields },
//           { new: true }
//         ).then(profile => res.json(profile));
//       } else {
//         // Create

//         // Check if handle exists
//         Profile.findOne({ user: req.user.id }).then(profile => {
//           if (profile) {
//             //errors.handle = 'That handle already exists';
//             //res.status(400).json(errors);
//             console.log(err);
//           }

//           // Save Profile
//           new Profile(profileFields).save().then(profile => res.json(profile));
//         });
//       }
//     });
//   }
// );

// app.get(
//   "/profile",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     console.log(res.body);
//     const errors = {};

//     Profile.findOne({ user: req.user.id })
//       .then(profile => {
//         if (!profile) {
//           errors.noprofile = "There is no profile for this user";
//           return res.status(404).json(errors);
//         }
//         res.json(profile);
//       })
//       .catch(err => res.status(404).json(err));
//   }
// );

// Setup an express server and define port to listen all incoming requests for this application
const setUpExpress = () => {
  const port = process.env.APP_PORT || 3001;

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
};

setUpExpress();