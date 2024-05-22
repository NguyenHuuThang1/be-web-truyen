import Novel from '../../models/novelModel.js';

export const getNovelById = async (req, res, next) => {
  try {
    const novel = await Novel.findById(req.params.novelId);

    res.status(200).json({
      status: 'success',
      novel,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
