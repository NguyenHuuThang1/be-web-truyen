import Category from '../../models/categoryModel.js';

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      status: 'success',
      length: categories.length,
      categories,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
