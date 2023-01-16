import mongoose from "mongoose";
import BlogModel from "../models/BlogModel.js";
import UserModel from "../models/UserModel.js";

// Get All Blogs

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogModel.find().populate('user');

    if (!blogs) {
      return res.status(404).json({
        message: "No Blogs Found",
      });
    }

    return res.status(200).json({
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Create A New Blog

export const addBlog = async (req, res) => {
  
  const { title, description, image, user } = req.body;

  try {
    const existingUser = await UserModel.findById(user);

    if (!existingUser) {
      return res.status(400).json({
        message: "Unable to find user by this ID",
      });
    }

    const blog = new BlogModel({
      title,
      description,
      image,
      user,
    });

    // Saving in database

    await blog.save();
    existingUser.blogs.push(blog);

    await existingUser.save();

    res.status(200).json({ blog });

  } catch (error) {
    res.status(500).json({
      message: error.message,   
    });
  }
};

//  Update Blog

export const updateBlog = async (req, res) => {
  const { title, description } = req.body;

  const blogId = req.params.id;

  try {
    const blog = await BlogModel.findByIdAndUpdate(blogId, {
      title,
      description,
    });

    if (!blog) {
      return res.status(404).json({ message: "Unable to Update Blog" });
    }

    return res.status(200).json({ blog });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//  Get Blog By Id

export const getById = async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await BlogModel.findById(id);
    if (!blog) {
      return res.status(404).json({
        message: "No Blogs Found",
      });
    }

    return res.status(200).json({ blog });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//  Delete  Blog

export const deleteBlog = async (req, res) => {
  const id = req.params.id;

  try {
    const blog = await BlogModel.findByIdAndDelete(id).populate("user");
   
    if (!blog) {
      return res.status(500).json({ message: "Unable to Delete" });
    }

    await blog.user.blogs.pull(blog);
    await blog.user.save();

    return res.status(200).json({
      message: "Delete Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// getByUserId

export const getByUserId = async(req,res)=>{
  
  const id = req.params.id

  try {  
    const userBlog = await UserModel.findById(id).populate("blogs");
    if (!userBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({user: userBlog})

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}