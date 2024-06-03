import mongoose from "mongoose";

const speakerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const Speaker = mongoose.model("Speaker", speakerSchema);

export default Speaker;