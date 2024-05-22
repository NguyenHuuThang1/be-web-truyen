import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    content: { type: String, trim: true },
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    reply: { type: mongoose.Schema.ObjectId, ref: 'Comment' },
    // forum: { type: mongoose.Schema.ObjectId, ref: 'Forum' },
    novel: { type: mongoose.Schema.ObjectId, ref: 'Novel' },
    chapter: { type: mongoose.Schema.ObjectId, ref: 'Chapter' },
    isReply: { type: Boolean, default: false },
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

commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'firstName lastName avatar username',
  });

  next();
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
