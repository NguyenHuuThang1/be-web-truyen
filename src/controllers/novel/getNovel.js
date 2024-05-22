import Novel from '../../models/novelModel.js';
import APIFeatures from '../../utils/apiFeatures.js';

export const getNovel = async (req, res, next) => {
  try {
    //TODO:

    const features = new APIFeatures(Novel.find(), req.query);
    features.filter().paginate().sort().limitFields();
    const novels = await features.data
      .populate({ path: 'translator', select: 'firstName lastName avatar' })
      .populate({ path: 'author', select: 'name slug' })
      .populate({ path: 'categories' });

    res.status(200).json({
      status: 'success',
      length: novels.length,
      novels,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
