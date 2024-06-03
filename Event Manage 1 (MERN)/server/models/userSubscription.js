import mongoose from 'mongoose';

const userSubscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: false,
  },
  validity: {
    type: Number,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
});

const userSubscription = mongoose.model('userSubscription', userSubscriptionSchema);

export default userSubscription;
