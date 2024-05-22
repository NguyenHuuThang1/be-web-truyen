import Category from '../../models/categoryModel.js';
import Novel from '../../models/novelModel.js';

export const deleteCategory = async (req, res, nexy) => {
  try {
    const cate = await Category.findByIdAndDelete(req.params.categoryId);

    await Novel.findOneAndUpdate(
      { categories: req.params.categoryId },
      { $pull: { category: req.params.categoryId } },
      { new: true }
    );

    res.status(200).json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json(error);
  }
};
