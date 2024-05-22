import User from '../../../models/userModel.js';

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    if (user) {
      return res.status(200).json('Deleted a user');
    }
    return res.status(404).json('User not found');
  } catch (err) {
    res.status(500).json(err);
  }
};
