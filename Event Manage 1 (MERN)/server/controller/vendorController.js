// import Vendor from '../models/vendor.js';
// import Vendor from "../models/userVendor";
// import userVendor from "../models/userVendor";
// import Vendor from "../models/userVendor";
// import Vendor from "../models/userVendor";
import Vendor from "../models/userVendor.js";
export const createVendor = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const newVendor = new Vendor({ name, email, phone });
    const savedVendor = await newVendor.save();
    res.status(201).json(savedVendor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().sort({timeTemps: -1});
    ;
    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    res.status(200).json(vendor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateVendor = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const updatedVendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedVendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    res.status(200).json(updatedVendor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteVendor = async (req, res) => {
  try {
    const id = req.params.id;
    const vendorExist = await Vendor.findById(id);
    if (!vendorExist) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    const deletedVendor = await Vendor.findByIdAndDelete(id);
    res.status(200).json({ message: 'Vendor deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
