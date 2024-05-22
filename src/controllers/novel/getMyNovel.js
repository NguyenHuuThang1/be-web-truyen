import Novel from '../../models/novelModel.js';

export const getMyNovel = async (req, res, next) => {
  try {
    const novels = await Novel.find({ translator: req.user.id });
    res.status(200).json({
      status: 'success',
      length: novels.length,
      novels,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
