import Novel from '../../models/novelModel.js';
import Review from '../../models/reviewModel.js';

export const createReview = async (req, res, next) => {
  try {
    const { content, rate } = req.body;
    const novel = req.params.novelId;

    const user = req.user.id;
    const review = new Review({ content, user, novel, rate });
    (await review.save()).populate({
      path: 'user',
      select: 'username firstName lastName',
    });

    const thisNovel = await Novel.findByIdAndUpdate(
      novel,
      {
        $inc: { rateSum: rate, reviewsQuan: 1 },
      },
      { new: true }
    );

    if (!thisNovel)
      return res
        .status(404)
        .json({ status: 'fail', message: 'something was wrong' });

    thisNovel.rateAvg = thisNovel.rateSum / thisNovel.reviewsQuan;

    await thisNovel.save();

    res.status(201).json({
      status: 'success',
      review,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
