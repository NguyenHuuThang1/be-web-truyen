import Chapter from '../../models/chapterModel.js';
import Novel from '../../models/novelModel.js';

export const deleteChapter = async (req, res, next) => {
  try {
    const user = await Novel.findById(req.params.novelId).select('translator');

    const translatorId = user.translator.toString();

    if (req.user.id !== translatorId)
      return res.status(404).json({ status: 'permission denied' });

    const deletedChapter = await Chapter.findByIdAndDelete(
      req.params.chapterId
    );

    await Novel.findByIdAndUpdate(
      req.params.novelId,
      { $inc: { progress: -1 } },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(205).json({});
  } catch (error) {
    res.status(500).json(error);
  }
};
