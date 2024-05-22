import jwt from 'jsonwebtoken';
export const checkUser = (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    const accessToken = token.split(' ')[1];
    jwt.verify(accessToken, process.env.SECRET_ACCESS_TOKEN, (err, user) => {
      if (err) {
        res.status(500).json(err);
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    next();
  }
};
