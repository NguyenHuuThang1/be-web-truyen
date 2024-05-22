import mongoose from 'mongoose';

const collectionSchema = new mongoose.Schema(
  {
    isLove: Boolean,
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    novel: { type: mongoose.Schema.ObjectId, ref: 'Novel' },
    chapter: { type: mongoose.Schema.ObjectId, ref: 'Chapter' },
    timestamp: { type: Date, default: Date.now },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Collection = mongoose.model('Collection', collectionSchema);

export default Collection;
