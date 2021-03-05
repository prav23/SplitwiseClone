const { User } = require("../models/user");

const login = async (req, res) => {
  // if(!req.body.name){
  //   res.status(400).send({message : "Content cannot be empty"});
  //   return;
  // }
  const user = {
    name: "Praveen Anguru",
    email: "fake-email@gmail.com",  
    hashedPassword: "hashedPassword",
    token: "token"
  };
  //res.send(user);
  res.json({
    success: true,
    token: user.token
  });
  // User.create(user)
  //   .then(data => {
  //     res.send(data);
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message : err.message || "some error occured while creating user"
  //     });
  //   });
};

module.exports = login;
