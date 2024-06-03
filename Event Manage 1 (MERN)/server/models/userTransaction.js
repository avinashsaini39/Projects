import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    // _id: { type: String, required: true }, // Define _id as String

    transactionID: { type: String, required: true }, // Change type to String
    transactionDateTime: { type: Date, required: true },
    transactionType: { type: String, required: true },
    amount: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    status: { type: String, required: true },
    timeTemps:{
        type: Date,
        default: Date.now,
      },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
