import User from '../../../models/userModel.js';
import bcrypt from 'bcrypt';
import { generateAccessToken } from '../../../utils/generateAccessToken.js';
import { generateRefreshToken } from '../../../utils/generateRefreshToken.js';

let refreshTokens = [];

export const loginUser = async (req, res) => {
  try {
    const { password, username } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json('Username Not Found');
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json('Wrong Password');
    }
    if (user && validPassword) {
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      refreshTokens.push(refreshToken);
      const { password, ...others } = user._doc;
      res.status(200).json({ ...others, accessToken, refreshToken });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
