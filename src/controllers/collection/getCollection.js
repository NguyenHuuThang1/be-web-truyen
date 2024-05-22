import Collection from '../../models/collectionModel.js';

export const getCollection = async (req, res, next) => {
  try {
    const collection = await Collection.findOne({
      user: req.user.id,
      novel: req.params.novelId,
    }).populate({ path: 'chapter' });

    res.status(200).json({
      status: 'success',
      collection,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
