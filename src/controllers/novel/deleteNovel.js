import Novel from '../../models/novelModel.js';
import Chapter from '../../models/chapterModel.js';
import Collection from '../../models/collectionModel.js';
import Comment from '../../models/commentModel.js';
// import Forum from '../../models/forumModel.js';
import Review from '../../models/reviewModel.js';

export const deleteNovel = async (req, res, next) => {
  try {
    const user = await Novel.findById(req.params.novelId).select('translator');

    const translatorId = user.translator.toString();

    if (req.user.id !== translatorId)
      return res.status(404).json({ status: 'permission denied' });

    await Chapter.deleteMany({ novel: req.params.novelId });
    await Collection.deleteMany({ novel: req.params.novelId });
    await Comment.deleteMany({ novel: req.params.novelId });
    // await Forum.deleteMany({ novel: req.params.novelId });
    await Review.deleteMany({ novel: req.params.novelId });

    await Novel.findByIdAndDelete(req.params.novelId);

    res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
