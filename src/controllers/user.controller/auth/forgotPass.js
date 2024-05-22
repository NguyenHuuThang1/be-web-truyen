import User from '../../../models/userModel.js';
import nodemailer from 'nodemailer';

export const forgotPassword = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    user.resetPasswordToken = otp;
    user.resetPasswordExpires = Date.now() + 60000; //Hết hạn sau 1 phút <3
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.PASSAPP,
      },
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: 'OTP reset password',
      text: `Your OTP for password reset is: ${otp}. This OTP is valid for 1 minute.`,
    };
    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ message: 'Email sent with password reset instructions' });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};
