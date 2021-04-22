const { successResponse, errorResponse } = require("./helper");
const Profile = require("../models/Profile");
const createProfile = async (req, res) => {
    try {
      const { user_id, image, phoneNumber, currency, language, timezone } = req.body;
      // const user_id = req.user.user_id;
      // console.log(user_id);
      const profileFields = {};
      profileFields.user = user_id;
      profileFields.image = image;
      profileFields.phonenumber = phoneNumber;
      profileFields.currency = currency;
      profileFields.language = language;
      profileFields.timezone = timezone;

      const profile = await Profile.findOne({ user : user_id});
      if (profile) {
        throw new Error("Profile already exists with same user_id");
      }
    
      const newProfile = await Profile.create(profileFields);
      return successResponse(req, res, {}, 201);
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  };

  const updateProfile = async (req, res) => {
    try {
        const { user_id, image, phonenumber, currency, language, timezone } = req.body;
        const profile = await Profile.findOne({user : user_id});
        const profileFields = {};
        profileFields.user = user_id;
        profileFields.image = image;
        profileFields.phonenumber = phonenumber;
        profileFields.currency = currency;
        profileFields.language = language;
        profileFields.timezone = timezone;
        if(profile !== null){
          await profile.update(profileFields);
        }
        else{
          throw new Error("profile doesnt exists for given user_id");
        }
        return successResponse(req, res, { profileFields }, 201);
      } catch (error) {
        return errorResponse(req, res, error.message);
      }
  };
  
  const getProfile = async (req, res) => {
    try {
      const user_id = req.params.user_id;
      console.log(user_id);
      const currentUserProfile = await Profile.findOne({user : user_id});
      if (currentUserProfile) {
        return successResponse(req, res, currentUserProfile, 201);
      }
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  };

module.exports = {createProfile, updateProfile, getProfile};
