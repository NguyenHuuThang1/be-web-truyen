import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please tell us your username!'],
      unique: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: [true, 'Please tell us your first name!'],
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide your email!'],
      trim: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email!'],
    },
    role: {
      type: String,
      enum: ['user', 'translator', 'admin'],
      default: 'user',
    },
    avatar: {
      type: String,
      default: function () {
        return process.env.AVT_DF_URL;
      },
    },
    password: {
      type: String,
      required: [true, 'Please provide a password!'],
      validate: [
        validator.isStrongPassword,
        'minLength: 8, maxLength: 16,minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1!',
      ],
    },
    passwordConfirm: {
      type: String,
      minlength: 8,
      maxlength: 16,
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'Passwords are not same!',
      },
    },
    resetPasswordToken: {
      type: String,
      default: null,
    },
    resetPasswordExpires: {
      type: Date,
      default: null,
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

userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.model('User', userSchema);
