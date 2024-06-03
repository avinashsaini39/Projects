import express from "express";
// import mongoose from "mongoose";

import Sponsor from "../models/userSponser.js";

const router = express.Router();



export const getAllSponsors = async (req, res) => {
  try {
    const sponsors = await Sponsor.find();
    res.status(200).json(sponsors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createSponsor = async (req, res) => {
  try {
    const { name } = req.body;
    const newSponsor = new Sponsor({
      name,
      image: req.file.path,
    });
    await newSponsor.save();
    res.status(201).json(newSponsor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateSponsorById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updateData = { name };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const updatedSponsor = await Sponsor.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.status(200).json(updatedSponsor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteSponsorById = async (req, res) => {
  try {
    const { id } = req.params;
    await Sponsor.findByIdAndDelete(id);
    res.status(200).json({ message: "Sponsor deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const toggleActive1 = async (req, res) => {
  try {
    const { id } = req.params;
    const sponsor = await Sponsor.findById(id);
    if (!sponsor) {
      return res.status(404).json({ message: "Sponsor not found" });
    }

    sponsor.active = !sponsor.active;
    await sponsor.save();

    res.status(200).json(sponsor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Default export for the router if needed
export default router;
