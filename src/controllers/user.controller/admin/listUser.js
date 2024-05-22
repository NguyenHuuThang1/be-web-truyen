import User from '../../../models/userModel.js';
import APIFeatures from '../../../utils/apiFeatures.js';

export const listUser = async (req, res, next) => {
  try {
    const features = new APIFeatures(User.find(), req.query);
    features.filter().paginate().sort().limitFields();
   
    const users = await features.data;
    console.log(features.data);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};
