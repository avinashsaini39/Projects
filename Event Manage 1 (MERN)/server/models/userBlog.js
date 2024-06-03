import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  published: {
    type: Boolean,
    default: false
  },
  timeTemps:{
    type: Date,
    default: Date.now,
  },
  
  active: {
    type: Boolean,
    default: true, // You can set it to true by default if needed
  },
});

blogSchema.statics.getTotalBlogs  = async function() {
  try {
    const total = await this.countDocuments();
    return total;
  } catch (error) {
    throw new Error("Failed to get total number of vendors");
  }
};



const Blog = mongoose.model('Blog', blogSchema);

export default Blog; // Export the Blog model as default