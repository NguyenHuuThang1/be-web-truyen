export const checkTranslatorRole = (req, res, next) => {
  if (req.user.role === 'translator') {
    next();
  } else {
    res.status(403).json("Access denied. You're not a translator.");
  }
};
