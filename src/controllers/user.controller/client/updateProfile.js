import { v2 as cloudinary } from 'cloudinary';
import User from '../../../models/userModel.js';

export const updateProfile = async (req, res) => {
  try {
    // Kiểm tra xem người dùng đã gửi file avatar hay không
    let avatarUrl;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      avatarUrl = result.secure_url;
    }

    // Lấy thông tin firstName và lastName từ yêu cầu
    const { firstName, lastName } = req.body;

    // Cập nhật thông tin cá nhân trong cơ sở dữ liệu
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          firstName: firstName,
          lastName: lastName,
          ...(avatarUrl && { avatar: avatarUrl }), // Nếu có avatarUrl mới cập nhật avatar
        },
      },
      { new: true }
    );

    // Trả về thông tin người dùng đã được cập nhật
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
