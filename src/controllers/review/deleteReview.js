// import Novel from '../../models/novelModel.js';
// import Review from '../../models/reviewModel.js';

// export const deleteReview = async (req, res, next) => {
//   try {
//     const review = await Review.findByIdAndDelete(req.params.reviewId);
//     if (!review) {
//       return res.status(404).json('Review not found');
//     }
//     await Novel.findByIdAndUpdate(req.params.novelId, [
//       { $inc: { rateSum: -review.rate } },
//       { $inc: { reviewsQuan: -1 } },
//       {
//         $set: {
//           rateAvg: {
//             $cond: {
//               if: { $eq: ['$reviewsQuan', 0] },
//               then: 0, // To avoid division by zero
//               else: { $divide: ['$rateSum', '$reviewsQuan'] },
//             },
//           },
//         },
//       },
//     ]
//     );

//     res.status(205).json({
//       status: 'success',
//     });
//   } catch (error) {
//     res.status(500).json(error);
//     console.log(error);
//   }
// };
