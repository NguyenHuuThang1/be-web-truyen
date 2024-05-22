import Collection from '../../models/collectionModel.js';
import Novel from '../../models/novelModel.js';

export const updateCollection = async (req, res, next) => {
  try {
    const user = req.user.id;
    const novel = req.params.novelId;
    const isLove = req.body.isLove;
    const chapter = req.body.chapter;
    const query = { novel, user };
    const update = { user, novel, isLove, chapter };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    if (!(await Novel.findById(novel)))
      return res.status(404).json({ status: 'ko có truyện này' });

    const collection = await Collection.findOneAndUpdate(
      query,
      update,
      options
    ).populate({ path: 'chapter' });

    res.status(201).json({
      status: 'success',
      collection,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
