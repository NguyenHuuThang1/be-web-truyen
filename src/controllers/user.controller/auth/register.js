import User from '../../../models/userModel.js';
import { v2 as cloudinary } from 'cloudinary';
export const register = async (req, res) => {
  try {
    const {id, username, firstName, lastName, email, password, passwordConfirm } =
      req.body;

    const user = new User({
      _id: id,
      username,
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
    });

    if (req.file) {
      const avatar = await cloudinary.uploader.upload(req.file.path);
      user.avatar = avatar.secure_url;
    }

    await user.save();
    res.status(201).json({
      status: 'Registration Successful',
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
