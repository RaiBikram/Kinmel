import Product from "../models/product.models.js";
import slugify from "slugify";
import fs from "fs";
import mongoose from "mongoose";
import Category from "../models/category.models.js";
import braintree from "braintree";
import Order from "../models/order.models.js";
import { configDotenv } from "dotenv";

configDotenv();
// //payment getway
// var gateway = new braintree.BraintreeGateway({
//   environment: braintree.Environment.Sandbox,
//   merchantId: process.env.BRAINTREE_MERCHAND_ID,
//   publicKey: process.env.BRAINTREE_PUBLIC_KEY,
//   privateKey: process.env.BRAINTREE_PRIVATE_KEY,
// });

//create
export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    // validation
    switch (true) {
      case !name:
        return res.status(500).json({ error: "Name is required" });
      case !description:
        return res.status(500).json({ error: "Description is required" });
      case !category:
        return res.status(500).json({ error: "category is required" });
      case !quantity:
        return res.status(500).json({ error: "quantity is required" });
      case !shipping:
        return res.status(500).json({ error: "shipping is required" });
      case !price:
        return res.status(500).json({ error: "price is required" });
      case !photo && photo?.size > 1000000: //kb size(1mb)
        return res
          .status(500)
          .json({ error: "Photo is required and should be less then 1mb " });
    }
    const newProduct = new Product({
      ...req.fields,
      slug: slugify(name),
    });

    if (photo) {
      newProduct.photo.data = fs.readFileSync(photo.path);
      newProduct.photo.contentType = photo.type;
    }

    await newProduct.save();
    return res.status(200).json({
      succcess: true,
      message: "Product is created successfull",
      products: newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      succcess: false,
      message: "Error while creating product",
      Error: error,
    });
  }
};

// All product controller
export const getAllProductController = async (req, res) => {
  try {
    const allProduct = await Product.find({})
      .populate("category")
      .select("-photo") // Exclude the 'photo' field
      .limit(12) // Limit results to 12 documents
      .sort({ createdAt: -1 }); // Sort by 'createdAt' in descending order

    return res.status(200).json({
      succcess: true,
      message: "Getting All product successfully ",
      products: allProduct,
      total_Count: allProduct.length,
    });
  } catch (error) {
    return res.status(400).json({
      succcess: false,
      message: "Error while getting all product ",
      Error: error.message,
    });
  }
};

// get single product

export const getSingleProductController = async (req, res) => {
  try {
    const { slug } = req.params;
    const singleProduct = await Product.findOne({ slug })
      .select("-photo")
      .populate("category");
    return res.status(200).json({
      succcess: true,
      message: "Sigle product  Fetch successfully ",
      Product: singleProduct,
    });
  } catch (error) {
    return res.status(500).json({
      succcess: false,
      message: "Error While getting product",
      Error: error.message,
    });
  }
};

// get product photo
export const getProductPhotoController = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await Product.findById(pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    return res.status(500).json({
      succcess: false,
      message: "Error while getting product photo",
      Error: error.message,
    });
  }
};

//delete product
export const deleteProductItemController = async (req, res) => {
  try {
    const { pid } = req.params;

    // Attempt to delete the document and capture the result
    const result = await Product.findByIdAndDelete(pid);

    // Check if the document was found and deleted
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      deletedProduct: result, // Return the deleted product's data
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({
      success: false,
      message: "Error while deleting product",
      error: error.message,
    });
  }
};

// Update product
export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    const { pid } = req.params;

    // Validation
    if (
      !name ||
      !description ||
      !category ||
      !quantity ||
      !shipping ||
      !price
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (photo && photo.size > 1000000) {
      // kb size (1MB)
      return res.status(400).json({ error: "Photo should be less than 1MB" });
    }

    // Ensure pid is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(pid)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      pid,
      {
        ...req.fields,
        slug: slugify(name),
      },
      {
        new: true,
      }
    );

    if (photo) {
      updatedProduct.photo.data = fs.readFileSync(photo.path);
      updatedProduct.photo.contentType = photo.type;
    }

    await updatedProduct.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while updating the product",
      error: error.message,
    });
  }
};

// product filter

export const productFilterControllers = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let filterArgs = {};
    //if filter by category
    if (checked?.length > 0) {
      filterArgs.category = checked; //  checked  or  {$in : checked} ;  Match any of the categories
    }

    //if filter by price
    if (radio?.length > 0) {
      filterArgs.price = { $gte: radio[0], $lte: radio[1] };
    }

    const products = await Product.find(filterArgs);
    return res.status(200).json({
      succcess: true,
      products,
    });
  } catch (error) {
    return res.status(400).json({
      succcess: false,
      message: "Error while filtering product ",
      Error: error.message,
    });
  }
};

// productCountController

export const productCountControllers = async (req, res) => {
  try {
    const total = await Product.find({}).estimatedDocumentCount();
    return res.status(200).json({
      succcess: true,
      total_product: total,
    });
  } catch (error) {
    return res.status(500).json({
      succcess: false,
      message: "Error in product count ",
      Error: error,
    });
  }
};

// product list base on page

export const productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params ? req.params.page : 1;
    const product = await Product.find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    return res.status(200).json({
      succcess: true,
      product,
    });
  } catch (error) {
    return res.status(400).json({
      succcess: false,
      message: "Error in per page ctrl ",
      Error: error,
    });
  }
};

//search product controller

export const searchProductController = async (req, res) => {
  try {
    const { keywords } = req.params;

    const results = await Product.find({
      $or: [
        { name: { $regex: keywords, $options: "i" } },
        { description: { $regex: keywords, $options: "i" } }, // ignore case sensitivity,
      ],
    }).select("-photo");

    return res.json(results);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error while searching for products",
      error: error.message,
    });
  }
};

//related product controller

export const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;

    const products = await Product.find({
      category: cid,
      _id: { $ne: pid },
    })
      .select("-photo")
      .limit(3) // Limit to 3 related products
      .populate("category");

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error while getting related products",
      error: error.message,
    });
  }
};

//product Category Controller
export const productCategoryController = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const products = await Product.find({ category: category._id }).populate(
      "category"
    );
    return res.status(200).json({
      success: true,
      category,
      products,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error while getting product category",
      error: error.message,
    });
  }
};



// //braintree Token || payment getway Token
// export const brainTreeTokenController = async (req, res) => {
//   try {
//     gateway.clientToken.generate({}),
//       (err, response) => {
//         if (err) {
//           return res.status(500).json({
//             succcess: false,
//             error: err,
//           });
//         } else {
//           return res.status(200).json(response);
//         }
//       };
//   } catch (error) {
//     return res.status(400).json({
//       succcess: false,
//       message: "Error While accessing the token ",
//     });
//   }
// };

// // payment
// export const brainTreePaymentController = async (req, res) => {
//   try {
//     const { cart, nonce } = req.body;
//     let total = 0;
//     cart.map((item) => {
//       total += item;
//     });

//     // transaction
//     let newTransaction = gateway.transaction.sale(
//       {
//         amount: total.toFixed(2),
//         paymentMethodNonce: nonce,
//         options: {
//           submitForSettlement: true,
//         },
//       },
//       async (error, result) => {
//         if (result) {
//           const order = new Order.find({
//             products: cart,
//             payment: result,
//             buyer: req.user._id,
//           });
//           await order.save();

//           return res.status(200).json({ ok: true });
//         } else {
//           return res.status(500).json(error);
//         }
//       }
//     );
//   } catch (error) {
//     return res.status(400).json({
//       succcess: false,
//       message: "Error While try to payment ",
//     });
//   }
// };
