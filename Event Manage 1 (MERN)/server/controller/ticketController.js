import Ticket from '../models/Ticket.js';

export const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTicket = async (req, res) => {
  const { title, price, validity, features } = req.body;
  const ticket = new Ticket({
    title,
    price,
    validity,
    features: features.split(',')
  });
  try {
    const newTicket = await ticket.save();
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateTicket = async (req, res) => {
  const { id } = req.params;
  const { title, price, validity, features } = req.body;
  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(id, {
      title,
      price,
      validity,
      features: features.split(',')
    }, { new: true });
    res.json(updatedTicket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTicket = async (req, res) => {
  const { id } = req.params;
  try {
    await Ticket.findByIdAndDelete(id);
    res.json({ message: 'Ticket deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
