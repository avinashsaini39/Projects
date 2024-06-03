import Venue from '../models/useVenue.js';

export const createVenue = async (req, res) => {
  try {
    const newVenueData = { ...req.body };
    if (req.file) {
      newVenueData.image = req.file.path; // Save the image path
    }
    const newVenue = new Venue(newVenueData);
    const savedVenue = await newVenue.save();
    res.status(201).json(savedVenue);
  } catch (error) {
    res.status(500).json({ message: 'Error adding venue', error: error.message });
  }
};

export const getAllVenues = async (req, res) => {
  try {
    const venues = await Venue.find();
    res.status(200).json(venues);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching venues', error: error.message });
  }
};

export const getVenueById = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) {
      return res.status(404).json({ message: 'Venue not found' });
    }
    res.status(200).json(venue);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching venue', error: error.message });
  }
};

export const updateVenue = async (req, res) => {
  try {
    const updatedVenueData = { ...req.body };
    if (req.file) {
      updatedVenueData.image = req.file.path; // Save the new image path if file uploaded
    }
    const updatedVenue = await Venue.findByIdAndUpdate(req.params.id, updatedVenueData, { new: true });
    if (!updatedVenue) {
      return res.status(404).json({ message: 'Venue not found' });
    }
    res.status(200).json(updatedVenue);
  } catch (error) {
    res.status(500).json({ message: 'Error updating venue', error: error.message });
  }
};




export const deleteVenue = async (req, res) => {
  try {
    const venue = await Venue.findByIdAndDelete(req.params.id);
    if (!venue) {
      return res.status(404).json({ message: 'Venue not found' });
    }
    res.status(200).json({ message: 'Venue deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting venue', error: error.message });
  }
};

export const toggleActive2 = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) {
      return res.status(404).json({ message: 'Venue not found' });
    }
    venue.active = !venue.active;
    const updatedVenue = await venue.save();
    res.status(200).json(updatedVenue);
  } catch (error) {
    res.status(500).json({ message: 'Error toggling venue active state', error: error.message });
  }
};


export const getActiveVenues = async (req, res) => {
  try {
    const venues = await Venue.find({ active: true });
    res.status(200).json(venues);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching venues', error });
  }
};