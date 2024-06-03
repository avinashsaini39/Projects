import express from "express";

import Hotel from "../models/hotelSchema.js";

const router = express.Router();



export const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createHotel = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newHotel = new Hotel({
      name,
      description,
      image: req.file.path,
    });
    await newHotel.save();
    res.status(201).json(newHotel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateHotelById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const updateData = { name, description };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const updatedHotel = await Hotel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.status(200).json(updatedHotel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteHotelById = async (req, res) => {
  try {
    const { id } = req.params;
    await Hotel.findByIdAndDelete(id);
    res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export default router;
