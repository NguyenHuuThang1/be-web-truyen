import Author from '../../models/authorModel.js';
import APIFeatures from '../../utils/apiFeatures.js';

export const getAuthor = async (req, res, next) => {
  try {
    const features = new APIFeatures(Author.find(), req.query);
    features.filter().paginate().sort().limitFields();
    const author = await features.data;

    res.status(200).json({
      status: 'success',
      length: author.length,
      author,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
