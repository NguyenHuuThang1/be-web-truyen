import Collection from '../../models/collectionModel.js';

export const deleteCollection = async (req, res, next) => {
  try {
    const collection = await Collection.findOneAndDelete({
      novel: req.params.novelId,
    });

    res.status(205).json({});
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
