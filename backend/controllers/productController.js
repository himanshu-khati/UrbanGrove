const Product = require("../models/productModel");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");

// create product
exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

// get all product
exports.getAllProducts = async (req, res, next) => {
  try {
    const resultsPerPage = 5;
    const productCount = await Product.countDocuments();
    const apiFeatures = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultsPerPage);
    const product = await apiFeatures.query;
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

// update product
exports.updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return next("Product not found", 500);
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      product,
      productCount,
    });
  } catch (error) {
    next(error);
  }
};

// delete product

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("product not found", 500));
    }
    await product.deleteOne();
    res.status(200).json({
      success: true,
      message: "product deleted sucessfully",
    });
  } catch (error) {
    next(error);
  }
};

// get product details

exports.getProductDetails = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};
