import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }, // Add status field
  timeTemps:{
    type: Date,
    default: Date.now,
  }

//   address: { type: String, required: true },
//   services: { type: String, required: true },
//   website: { type: String, required: true },
})

const User = mongoose.model('User', userSchema);

export default User; // Export the Blog model as default