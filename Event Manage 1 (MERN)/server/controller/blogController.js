// const Blog = require('../models/Blog');
import Blog from '../models/userBlog.js';

// Controller function to create a new blog post
// exports.createBlog = async (req, res) => {
  
// };
export const createBlog = async (req, res) => {
    try {
      const { title, content, author } = req.body;
      const newBlog = new Blog({ title, content, author });
      const savedBlog = await newBlog.save();
      res.status(201).json(savedBlog);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
// Controller function to get all blog posts
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({timeTemps: -1});;
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to get a single blog post by ID
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to update a blog post by ID
export const updateBlog = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content, author, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to delete a blog post by ID
export const deleteBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const blogExist = await Blog.findById(id);
    if (!blogExist) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    const deletedBlog = await Blog.findByIdAndDelete(id);
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Toggle the active status of a blog
export const toggleActive = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    blog.active = !blog.active;
    await blog.save();

    return res.status(200).json(blog);
  } catch (error) {
    console.error('Error toggling blog active state:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};