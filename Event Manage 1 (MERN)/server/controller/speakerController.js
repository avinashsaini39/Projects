import express from "express";

import Speaker from "../models/userSpeaker.js";

const router = express.Router();



export const getAllSpeakers = async (req, res) => {
  try {
    const speakers = await Speaker.find();
    res.status(200).json(speakers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createSpeaker = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newSpeaker = new Speaker({
      name,
      description,
      image: req.file.path,
    });
    await newSpeaker.save();
    res.status(201).json(newSpeaker);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateSpeakerById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const updateData = { name, description };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const updatedSpeaker = await Speaker.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.status(200).json(updatedSpeaker);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteSpeakerById = async (req, res) => {
  try {
    const { id } = req.params;
    await Speaker.findByIdAndDelete(id);
    res.status(200).json({ message: "Speaker deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const toggleActive4 = async (req, res) => {
  try {
    const { id } = req.params;
    const speaker = await Speaker.findById(id);
    if (!speaker) {
      return res.status(404).json({ message: "Speaker not found" });
    }

    speaker.active = !speaker.active;
    await speaker.save();

    res.status(200).json(speaker);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default router;
