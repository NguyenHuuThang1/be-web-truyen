import User from '../../../models/userModel.js';

export const getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      'username email firstName lastName avatar role'
    );
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};
