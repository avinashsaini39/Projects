import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  title: String,
  price: Number,
  validity: String,
  features: [String]
});

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;
