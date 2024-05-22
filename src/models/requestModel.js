import mongoose from 'mongoose';

const requestModel = new mongoose.Schema(
  {
    createTime: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['waiting', 'success', 'reject'],
      default: 'waiting',
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Novel must have a name!'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);


requestModel.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'firstName lastName avatar'
    });
  next();
});

const Request = mongoose.model('Request', requestModel);

export default Request;
