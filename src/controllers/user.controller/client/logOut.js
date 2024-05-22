let refreshTokens = [];

export const logOut = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(404).json('No refreshtoken found');
    }
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    res.clearCookie('refreshToken');
    res.status(200).json('Logout successful');
  } catch (err) {
    res.status(500).json(err);
  }
};
