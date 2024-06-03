import mongoose from 'mongoose';

const venueSchema = new mongoose.Schema({
  venueName: { type: String, required: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  active: { type: Boolean, default: true },
});

const Venue = mongoose.model('Venue', venueSchema);
export default Venue;
