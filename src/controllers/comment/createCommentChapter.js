import Chapter from '../../models/chapterModel.js';
import Comment from '../../models/commentModel.js';

export const createCommentChapter = async (req, res, next) => {
  try {
    const { content } = req.body;

    const user = req.user.id;

    const chapter = req.params.chapterId;
    if (!(await Chapter.findById(chapter)))
      return res.status(404).json({ status: 'ko có truyện này' });

    const comment = new Comment({
      content,
      user,
      chapter,
    });

    await comment.save();

    res.status(201).json({
      status: 'success',
      comment,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
