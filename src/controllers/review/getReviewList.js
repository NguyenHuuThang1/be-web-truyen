import Review from '../../models/reviewModel.js';

export const getReviewList = async (req, res, next) => {
  try {
    const novel = req.params.novelId;
    const reviewList = await Review.find({ novel: novel }).sort('-createTime');

    res.status(200).json({
      status: 'success',
      result: reviewList.length,
      reviewList,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
