import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";
import {
  braintreePaymentContoller,
  braintreeTokenContoller,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFilterController,
  productListController,
  productPhotoController,
  relatedProductController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";

const router = express.Router();

//routes
//create product route
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//get products
router.get("/get-products", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//delete product
router.delete(
  "/delete-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  deleteProductController
);

//filter product
router.post('/product-filters',productFilterController);

//product count
router.get('/product-count',productCountController);

//product per page
router.get('/product-list/:page',productListController);

//search product
router.get('/search/:keyword',searchProductController);

//similar product
router.get('/related-product/:pid/:cid',relatedProductController);

//category wise products
router.get('/product-category/:slug',productCategoryController)

//payments
//token
router.get('/braintree/token',braintreeTokenContoller);

//payments
router.post('/braintree/payments',requireSignIn,braintreePaymentContoller);

export default router;
