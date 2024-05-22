import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    content: { type: String, trim: true },
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    novel: { type: mongoose.Schema.ObjectId, ref: 'Novel' },
    rate: {
      type: Number,
      enum: [0, 1, 2, 3, 4, 5],
      default: 5,
    },
    createTime: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'firstName lastName avatar username',
  });

  next();
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
