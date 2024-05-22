import e from 'express';
import Novel from '../../models/novelModel.js';
import Review from '../../models/reviewModel.js';

export const updateReview = async (req, res, next) => {
  try {
    const oldReview = await Review.findById(req.params.reviewId);

    if (oldReview.user.id !== req.user.id)
      return res.status(404).json({
        status: 'permission denied',
      });

    const { content, rate } = req.body;

    let review = await Review.findByIdAndUpdate(req.params.reviewId, {
      content,
      rate,
    });

    if (!review)
      res.status(404).json({ status: 'fail', message: 'something was wrong' });

    review = await Review.findById(req.params.reviewId);

    if (oldReview.rate !== rate) {
      const thisNovel = await Novel.findByIdAndUpdate(
        oldReview.novel,
        {
          $inc: { rateSum: rate - oldReview.rate },
        },
        { new: true }
      );

      thisNovel.rateAvg = thisNovel.rateSum / thisNovel.reviewsQuan;
      await thisNovel.save();

      console.log(thisNovel);
    }

    res.status(201).json({
      status: 'success',
      review,
    });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};
