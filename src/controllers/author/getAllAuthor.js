import Author from '../../models/authorModel.js';
import Novel from '../../models/novelModel.js';

export const getAllAuthor = async (req, res, next) => {
  try {
    const authors = await Author.find().select('name');

    res.status(200).json({
      status: 'success',
      authors,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
