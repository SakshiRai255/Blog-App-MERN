import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt"

// getAll User

export const getAllUser = async (req, res) => {
  try {
    let users = await UserModel.find();

    if (!users) {
      return res.status(404).json({
        message: "No User Found",
      });
    }
    return res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({
        message:error.message
    });
  }
};

// Registering a new user

export const signup = async (req, res) => {
    
    const {name,email,password} = req.body

    try {

        const existUser = await UserModel.findOne({email});

        if (existUser) {
            return res.status(404).json({
                message: "User Already Exists!  Login Instead",
              });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new UserModel({
            name,
            email,
            password : hashedPassword,
            blogs:[],
        })

        const newUser = await user.save();

        return res.status(200).json({newUser});
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        });
    }
};

// Login Functionality

export const login = async(req,res)=>{
    const {email,password} = req.body;
    try {
        
        const existEmail = await UserModel.findOne({email})

        if (!existEmail) {
            return res.status(404).json({
                message: "Couldn't Find User By This Email",
              });
        }

        const isPasswordCorrect = await bcrypt.compare (password,existEmail.password);

        if (!isPasswordCorrect) {
            return res.status(404).json({
                message: "Incorrect Password",
              });
        }
        return res.status(200).json({
            existEmail,
            message: "Login Successfully",
            user:existEmail
          });

    } catch (error) {
        res.status(500).json({
            message:error.message
        });
    }
}