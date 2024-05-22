import mongoose from 'mongoose';

const chapterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'This chapter must have a name!'],
      trim: true,
    },
    number: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      required: [true, 'his chapter must have content!'],
      trim: true,
    },
    watch: {
      type: Number,
      default: 0,
    },
    novel: { type: mongoose.Schema.ObjectId, ref: 'Novel' },
    translator: { type: mongoose.Schema.ObjectId, ref: 'User' },
    createTime: {
      type: Date,
      default: Date.now,
    },
    slug: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

chapterSchema.pre('save', function (next) {
  this.slug = `chuong-${this.number}`;
  next();
});

const Chapter = mongoose.model('Chapter', chapterSchema);

export default Chapter;
