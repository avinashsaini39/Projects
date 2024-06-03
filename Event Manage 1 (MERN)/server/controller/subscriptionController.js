import userSubscription from '../models/userSubscription.js';

// Fetch all subscriptions
export const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await userSubscription.find();
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new subscription
export const createSubscription = async (req, res) => {
  const { name, email, price, validity, description } = req.body;

  try {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + validity);

    const newSubscription = new userSubscription({
      name,
      email,
      price,
      validity,
      description,
      dateExpires: expirationDate,
    });

    await newSubscription.save();
    res.status(201).json(newSubscription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a subscription by ID
export const updateSubscription = async (req, res) => {
  const { name, email, price, validity, description } = req.body;

  try {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + validity);

    const updatedSubscription = await userSubscription.findByIdAndUpdate(
      req.params.id,
      { name, email, price, validity, description, dateExpires: expirationDate },
      { new: true }
    );

    res.status(200).json(updatedSubscription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a subscription by ID
export const deleteSubscription = async (req, res) => {
  try {
    await userSubscription.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Subscription deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
