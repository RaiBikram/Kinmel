import slugify from "slugify";
import Category from "../models/category.models.js";

//create category controller 
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).json({
        success: true,
        message: "Category name required !",
      });
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(200).json({
        success: true,
        message: "Category Already Exists",
      });
    }

    const newCategory = new Category({
      name: name,
      slug: slugify(name),
    });

    await newCategory.save();
    return res
    .status(200)
    .json({
      success: true,
      message: "New category successfully Created",
      category: newCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error,
      message: "Error is category",
    });
  }
};

//update category
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params; // Match route parameter name
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
    return res.status(200).json({
      success: true,
      message: "Category successfully updated.",
      category,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error while updating category.",
      Error: error,
    });
  }
};


//get all category 
export const allCategoryController = async( req, res) =>{
try {
    const allCategories = await Category.find({});
    return res
    .status(200)
    .json({
        success:true,
        message:"All categories List",
        allCategories:allCategories ,
    })
} catch (error) {
    return res
    .status(500)
    .json({
        success:false,
        Error:error,
        message:"Error while getting all categories"
    })
}
}

//single category
export const singleCategoryController = async(req, res)=>{
try {
    const {slug} = req.params;
    const singleCategory = await Category.findOne(slug);
    return res 
    .status(200)
    .json({
        success:true,
        message:"Get single category sucessfully",
        category: singleCategory,
    })
} catch (error) {
 return res 
 .status(400)
 .json({
    success:false,
    message:"Error while getting single category ", 
    Error : error 
 })   
}
}

// delete category 
export const deleteCategoryController = async(req, res)=>{
try {
    const {id} = req.params;
    const delCategory = await Category.findByIdAndDelete(id);
    return res
    .status(200)
    .json({
        success:true,
        message:"Your category deleted successfully "
    })
} catch (error) {
    return res 
    .status(500)
    .json({
        success:false,
        message:"Error while deleting category ",
        Error: error
    })
}
}