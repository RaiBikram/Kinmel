import slugify from "slugify";
import Category from "../models/category.models.js";

// Create Category Controller
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required!",
      });
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message: "Category already exists",
      });
    }

    const newCategory = new Category({
      name: name,
      slug: slugify(name),
    });

    await newCategory.save();
    return res.status(201).json({
      success: true,
      message: "New category created successfully",
      category: newCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Error occurred while creating the category",
    });
  }
};

// Update Category Controller
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    if (!name || !id) {
      return res.status(400).json({
        success: false,
        message: "Name and Category ID are required.",
      });
    }

    const category = await Category.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category successfully updated.",
      category,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error while updating category.",
      error: error.message,
    });
  }
};

// Get All Categories Controller
export const allCategoryController = async (req, res) => {
  try {
    const allCategories = await Category.find({});
    if(!allCategories){
      return res
      .status(400)
      .json({
        success:false,
        message:""
      })
    }
    return res.status(200).json({
      success: true,
      message: "All categories fetched successfully",
      allCategories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Error while fetching categories",
    });
  }
};

// Get Single Category Controller
export const singleCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;
    const singleCategory = await Category.findOne({ slug });

    if (!singleCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category fetched successfully",
      category: singleCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while fetching single category",
      error: error.message,
    });
  }
};

// Delete Category Controller
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const delCategory = await Category.findByIdAndDelete(id);

    if (!delCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while deleting category",
      error: error.message,
    });
  }
};
