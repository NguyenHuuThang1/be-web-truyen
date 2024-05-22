import jwt from 'jsonwebtoken';
import { generateAccessToken } from './generateAccessToken.js';
let refreshTokens = [];

export const requestRefreshToken = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) return res.status(401).json("You're not authenticated");
  if (!refreshToken.includes(refreshToken)) {
    return res.status(403).json('Token is not valid');
  }

  jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN, (err, user) => {
    if (err) {
      return res.status(500).json(err);
    }
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

    const newAccessToken = generateAccessToken(user);
    res.status(200).json({ accessToken: newAccessToken });
  });
};
