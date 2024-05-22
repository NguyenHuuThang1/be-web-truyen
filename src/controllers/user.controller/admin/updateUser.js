import User from '../../../models/userModel.js';

export const updateUser = async (req, res, next) => {
  try {
      const { firstName, lastName, role, username, email,newid } = req.body;

      const user = await User.findByIdAndUpdate(req.params.id, {
        firstName,
        lastName,
        role,
        username,
        email,
        
      });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
};
