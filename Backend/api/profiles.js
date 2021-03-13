const { successResponse, errorResponse } = require("./helper");
const { Profile } = require("../models");

const createProfile = async (req, res) => {
    try {
      const { user_id, image, phoneNumber, currency, language, timezone } = req.body;
  
      const profile = await Profile.findOne({
        where: {
          user_id,
        },
      });
      if (profile) {
        throw new Error("Profile already exists with same user_id");
      }
    
      const payload = {
        user_id,
        image,
        phoneNumber,
        currency,
        language,
        timezone,
      };
      const newProfile = await Profile.create(payload);
      return successResponse(req, res, {}, 201);
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  };

  const updateProfile = async (req, res) => {
    try {
        const { user_id, image, phoneNumber, currency, language, timezone } = req.body;
        const profile = await Profile.findOne({
          where: {
            user_id
          },
        });
        if(profile !== null){
          await profile.update({ user_id, image, phoneNumber, currency, language, timezone });
        }
        else{
          throw new Error("profile doesnt exists for given user_id");
        }
        return successResponse(req, res, {}, 201);
      } catch (error) {
        return errorResponse(req, res, error.message);
      }
  };
  
module.exports = {createProfile, updateProfile};
