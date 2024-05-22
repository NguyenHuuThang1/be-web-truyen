export const rejectUser = (req, res, next) => {
  if (req.user.role === 'translator' || req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json("Access denied. You're not a translator.");
  }
};
