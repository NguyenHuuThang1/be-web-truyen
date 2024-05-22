import Category from '../../models/categoryModel.js';

export const updateCategory = async (req, res, nexy) => {
  try {
    const { name, description } = req.body;

    const category = await Category.findByIdAndUpdate(req.params.categoryId, {
      name,
      description,
    });

    res.status(201).json({
      status: 'success',
      category,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
