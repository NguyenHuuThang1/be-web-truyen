import Chapter from '../../models/chapterModel.js';

export const getChapterList = async (req, res, next) => {
  try {
    const novel = req.params.novelId;
    const chapterList = await Chapter.find({ novel: novel })
      .sort('number')
      .select('-content');
    res.status(200).json({
      status: 'success',
      chapterList,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
