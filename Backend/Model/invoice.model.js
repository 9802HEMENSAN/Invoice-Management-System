const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  invoiceDate: {
    type: Date,
    required: true,
  },
  invoiceNumber: {
    type: String,
    required: true,
    unique: true,
  },
  invoiceAmount: {
    type: Number,
    required: true,
  },
  financialYear: {
    type: String,
    required: true,
  },
});

const Invoice = mongoose.model('invoice', invoiceSchema);

module.exports = Invoice;
