import Chapter from '../../models/chapterModel.js';

export const getChapterById = async (req, res, next) => {
  try {
    const chapter = await Chapter.findById(req.params.chapterId);
    res.status(200).json({
      status: 'success',
      chapter,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
