import mongoose from 'mongoose';
import removeAccents from '../utils/removeAccents.js';

const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Author must have a name'],
      trim: true,
    },
    birthday: Date,
    
    description: { type: String, trim: true },
    avatar: {
      type: String,
      default: function () {
        return process.env.AVT_DF_URL;
      },
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

authorSchema.pre('save', function (next) {
  this.slug = removeAccents(this.name.toLowerCase().split(' ').join('-'));
  next();
});

authorSchema.pre('findOneAndUpdate', function (next) {
  if (this._update.name)
    this._update.slug = removeAccents(
      this._update.name.toLowerCase().split(' ').join('-')
    );
  next();
});

const Author = mongoose.model('Author', authorSchema);

export default Author;
