import express from "express";
import {
  loginController,
  registerController,
  forgotPasswordController,
  testController,
  updatedProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController
} from "../controllers/authController.js";
import { requireSignIn, isAdmin } from "./../middlewares/authMiddleware.js";
//router object
const router = express.Router();

//routing
//REGISTER || METHOD : POST
router.post("/register", registerController);

//LOGIN ||METHOD : POST
router.post("/login", loginController);

//Forgot Password || Method : POST
router.post("/forgot-password", forgotPasswordController);

//test  routes
router.get("/test", requireSignIn, isAdmin, testController);

//protected user routes
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected admin routes
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//updated profile
router.put("/profile", requireSignIn, updatedProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all-orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

//order status update
router.put('/order-status/:orderId',requireSignIn,isAdmin,orderStatusController);

export default router;
