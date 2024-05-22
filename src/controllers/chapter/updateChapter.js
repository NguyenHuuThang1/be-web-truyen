import Chapter from '../../models/chapterModel.js';
import Novel from '../../models/novelModel.js';

export const updateChapter = async (req, res, next) => {
  try {
    const user = await Novel.findById(req.params.novelId).select('translator');

    const translatorId = user.translator.toString();

    if (req.user.id !== translatorId)
      return res.status(404).json({ status: 'permission denied' });
    const { number, content, name } = req.body;

    let chapter = await Chapter.findByIdAndUpdate(
      req.params.chapterId,
      {
        name,
        number,
        content,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!chapter) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'something was wrong' });
    }

    chapter = await Chapter.findById(req.params.chapterId);

    res.status(201).json({
      status: 'success',
      chapter,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
