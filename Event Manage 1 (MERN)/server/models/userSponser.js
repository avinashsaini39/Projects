import mongoose from "mongoose";

const sponsorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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

const Sponsor = mongoose.model("Sponsor", sponsorSchema);

export default Sponsor;
