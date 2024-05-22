import mongoose from 'mongoose';
import removeAccents from './../utils/removeAccents.js';

const novelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Novel must have a name!'],
      trim: true,
    },
    description: {
      type: String,
      default: 'Chưa có mô tả!',
      trim: true,
    },
    createTime: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['Bỏ dở', 'Chưa hoàn thành', 'Hoàn thành'],
      default: 'Chưa hoàn thành',
    },
    progress: {
      type: Number,
      default: 0,
    },
    photo: {
      type: String,
      default: process.env.PHOTO_NOVEL_DF,
    },
    translator: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Novel must have a name!'],
    },
    author: { type: mongoose.Schema.ObjectId, ref: 'Author' },
    categories: { type: mongoose.Schema.ObjectId, ref: 'Category' },
    reviewsQuan: {
      type: Number,
      default: 0,
    },
    rateAvg: {
      type: Number,
      default: 0,
    },
    rateSum: {
      type: Number,
      default: 0,
    },
    watch: {
      type: Number,
      default: 0,
    },
    love: {
      type: Number,
      default: '',
    },
    coverImg: {
      type: String,
      default: process.env.COVERIMG_NOVEL_DF,
    },
    slug: {
      type: String,
      unique: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

novelSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'author',
    select: 'name',
  });

  next();
});

// novelSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'translator',
//     select: 'firstName lastName avatar',
//   });
//   next();
// });

novelSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'categories',
  });
  next();
});

novelSchema.pre('save', function (next) {
  this.slug = removeAccents(this.name.toLowerCase().split(' ').join('-'));
  next();
});

novelSchema.pre('findOneAndUpdate', function (next) {
  if (this._update.name)
    this._update.slug = removeAccents(
      this._update.name.toLowerCase().split(' ').join('-')
    );
  next();
});

const Novel = mongoose.model('Novel', novelSchema);

export default Novel;
