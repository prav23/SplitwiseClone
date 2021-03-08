// const crypto = require("crypto");
const { successResponse, errorResponse } = require("./helper");
const { User } = require("../models");

const findAllUsers = async (req, res) => {
    try {
        const allUsers = await User.findAll({
          where: {},
        });
        if (allUsers) {
          return successResponse(req, res, { allUsers });
        } else {
          return errorResponse(
            req,
            res,
            "Unable to find an users",
            401
          );
        }
      } catch (error) {
        return errorResponse(req, res, error.message);
      }
};

const findUser = async (req, res) => {
    try {
        //const Id = req.params.id;
        const id = req.query.id;
        //console.log(Id);
        console.log(id);
        //var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
        const user = await User.findOne({
            where: { id : id}
        });
        if (user !== null) {
          return successResponse(req, res, { user });
        } else {
          return errorResponse(
            req,
            res,
            "Unable to find an users",
            401
          );
        }
      } catch (error) {
        return errorResponse(req, res, error.message);
      }
};


module.exports = {findAllUsers, findUser};
// module.exports =  findUser;

