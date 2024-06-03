// import Transaction from "../models/Transaction.js";
// import Transaction from "../models/userTransaction.js";
import Transaction from "../models/userTransaction.js";

export const createTransaction = async (req, res) => {
  try {
    const { transactionID, transactionDateTime, transactionType, amount, paymentMethod, status } = req.body;
    const newTransaction = new Transaction({ transactionID, transactionDateTime, transactionType, amount, paymentMethod, status });
    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({timeTemps: -1});
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const { transactionID, transactionDateTime, transactionType, amount, paymentMethod, status } = req.body;
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { transactionID, transactionDateTime, transactionType, amount, paymentMethod, status, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(200).json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const id = req.params.id;
    const transactionExist = await Transaction.findById(id);
    if (!transactionExist) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    const deletedTransaction = await Transaction.findByIdAndDelete(id);
    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
