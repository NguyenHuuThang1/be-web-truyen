import Collection from '../../models/collectionModel.js';
import APIFeatures from '../../utils/apiFeatures.js';

export const getCollections = async (req, res, next) => {
  try {
    //TODO:
    const features = new APIFeatures(
      Collection.find({
        user: req.user.id,
      }),
      req.query
    );
    features.filter().paginate().sort().limitFields();
    const collection = await features.data
      .populate({ path: 'novel' })
      .populate({ path: 'chapter' });

    res.status(200).json({
      status: 'success',
      length: collection.length,
      collection,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getLoveList = async (req, res, next) => {
  try {
    //TODO:
    const features = new APIFeatures(
      Collection.find({
        user: req.user.id,
        isLove: true,
      }),
      req.query
    );
    features.filter().paginate().sort().limitFields();
    const loveList = await features.data;

    res.status(200).json({
      status: 'success',
      length: loveList.length,
      loveList,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
