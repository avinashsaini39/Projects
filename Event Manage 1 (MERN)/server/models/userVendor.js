import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
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
// vendorSchema.statics.getTotalVendors = async function() {
//   try {
//     const total = await this.countDocuments();
//     return total;
//   } catch (error) {
//     throw new Error("Failed to get total number of vendors");
//   }
// };


const Vendor = mongoose.model('Vendor', vendorSchema);

export default Vendor; // Export the Blog model as default