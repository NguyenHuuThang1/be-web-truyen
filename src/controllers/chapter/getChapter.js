import Chapter from '../../models/chapterModel.js';
import APIFeatures from '../../utils/apiFeatures.js';

export const getChapter = async (req, res, next) => {
  try {
    const features = new APIFeatures(Chapter.find(), req.query);
    features.filter().paginate().sort().limitFields();
    const chapter = await features.data
      .populate({
        path: 'translator',
        select: 'firstName lastName',
      })
      .populate({ path: 'novel', select: 'name author slug categories' });
    res.status(200).json({
      status: 'success',
      length: chapter.length,
      chapter,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
