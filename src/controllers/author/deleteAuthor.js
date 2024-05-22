import Author from '../../models/authorModel.js';
import Novel from '../../models/novelModel.js';

export const deleteAuthor = async (req, res, next) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.authorId);

    if (!author)
      return res
        .status(404)
        .json({ status: 'fail', message: 'something was wrong' });

    await Novel.updateMany(
      { author: req.params.authorId },
      { $set: { author: null } }
    );

    res.status(200).json({
      status: 'success',
      message: 'deleted',
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
