const register = async (req, res) => {

  //res.send(user);
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };
  res.json(user);
  
};

module.exports = register;
