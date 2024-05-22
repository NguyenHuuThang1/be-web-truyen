import { v2 as cloudinary } from 'cloudinary';
import Novel from '../../models/novelModel.js';

export const createNovel = async (req, res) => {
  try {
    const { name, description, photo, categories, author } =
      req.body;

    const translator = req.user.id;

    // Tạo mới đối tượng Novel
    const newNovel = new Novel({
      name,
      description,
      photo,
      categories,
      translator,
      author,
    });

    // Kiểm tra xem có file coverImg được upload không
    if (req.files['coverImg']) {
      const coverImg = await cloudinary.uploader.upload(
        req.files['coverImg'][0].path,
        {
          folder: 'Data/coverImg',
        }
      );
      newNovel.coverImg = coverImg.secure_url;
    }

    // Kiểm tra xem có file photo được upload không
    if (req.files['photo']) {
      const photo = await cloudinary.uploader.upload(
        req.files['photo'][0].path,
        {
          folder: 'Data/photo',
        }
      );
      newNovel.photo = photo.secure_url;
    }

    // Lưu đối tượng Novel vào cơ sở dữ liệu
    await newNovel.save();

    // Trả về kết quả thành công
    res.status(201).json({
      status: 'success',
      newNovel,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
