import { comparePassword, hashPassword } from "../heplers/authHelper.js";
import userModels from "../models/userModels.js";
import orderModel from "../models/orderModel.js";
import JWT from "jsonwebtoken";

//register user
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;

    //check user
    const existingUser = await userModels.findOne({ email });
    //if existing user
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Registered, Please Login",
      });
    }

    //validations
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!password) {
      return res.send({ message: "Password is required" });
    }
    if (!phone) {
      return res.send({ message: "Phone no. is required" });
    }
    if (!address) {
      return res.send({ message: "Address is required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is required" });
    }

    // if(!role){
    //     return res.send({message : "Role is required"})
    // }

    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModels({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      answer,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      e,
    });
  }
};

//login user
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModels.findOne({ email });
    if (!user) {
      res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    //check password
    const match = await comparePassword(password, user.password);
    if (!match) {
      res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //generate token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successful",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      message: "Error in login",
      e,
    });
  }
};

//forgot password controller
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "newPassword is required" });
    }
    //check answer and email
    const user = await userModels.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModels.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successful",
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      message: "Message went wrong",
      e,
    });
  }
};

//test controller
export const testController = async (req, res) => {
  console.log("Protected Router");
  res.send("Proteccted Route");
};

//updated profile
export const updatedProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModels.findById(req.user._id);
    //password;
    if (password && password.length < 6) {
      return res.json({
        error: "Password should be atleast 6 characters long",
      });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModels.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile updated successfully",
      updatedUser,
    });
  } catch (e) {
    console.log(e);
    res.status(400).send({
      success: false,
      message: "Error while updating profile",
      e,
    });
  }
};

export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      message: "Error while getting orders",
    });
  }
};

export const getAllOrdersController = async(req,res) =>{
    try {
        const orders = await orderModel
          .find({})
          .populate("products", "-photo")
          .populate("buyer", "name")
          ;
        res.json(orders);
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error WHile Geting Orders",
          error,
        });
      }
}

//order status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      message: "Error while updating order",
      e,
    });
  }
};
