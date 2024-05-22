import Author from '../../models/authorModel.js';

export const updateAuthor = async (req, res, next) => {
  try {
    const { name, birthday, description, avatar } = req.body;

    const author = await Author.findByIdAndUpdate(
      req.params.authorId,
      {
        name,
        birthday,
        description,
        avatar,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!author)
      return res
        .status(404)
        .json({ status: 'fail', message: 'something was wrong' });

    res.status(201).json({
      status: 'success',
      author,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
