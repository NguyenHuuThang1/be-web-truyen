import { v2 as cloudinary } from 'cloudinary';
import Novel from '../../models/novelModel.js';

export const updateNovel = async (req, res, next) => {
  try {
    const user = await Novel.findById(req.params.novelId);

    const translatorId = user.translator.toString();

    if (req.user.id !== translatorId) {
      return res.status(404).json({ status: 'permission denied' });
    }

    const { name, description, photo, categories, coverImg, status } = req.body;

    let author = req.body.author;

    if (req.body.isMine) {
      author = undefined;
    }

    let novel = await Novel.findByIdAndUpdate(
      req.params.novelId,
      {
        status,
        name,
        description,
        photo,
        categories,
        author,
        coverImg,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!novel)
      return res
        .status(404)
        .json({ status: 'fail', message: 'something was wrong' });

    // Kiểm tra xem có file coverImg được upload không
    if (req.files && req.files['coverImg']) {
      const coverImg = await cloudinary.uploader.upload(
        req.files['coverImg'][0].path,
        {
          folder: 'Data/coverImg',
        }
      );
      novel.coverImg = coverImg.secure_url;
    }

    // Kiểm tra xem có file photo được upload không
    if (req.files && req.files['photo']) {
      const photo = await cloudinary.uploader.upload(
        req.files['photo'][0].path,
        {
          folder: 'Data/photo',
        }
      );
      novel.photo = photo.secure_url;
    }

    await novel.save();

    res.status(200).json({
      status: 'success',
      novel,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
