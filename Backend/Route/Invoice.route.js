const express= require("express");
const InvoiceRouter = express.Router();
const Invoice =  require("../Model/invoice.model");

InvoiceRouter.post('/invoices', async (req, res) => {
    try {
      const { invoiceDate, invoiceNumber, invoiceAmount, financialYear } = req.body;
  
      // Perform validations, e.g., check if the invoice number is unique, and date is valid.
  
      const newInvoice = new Invoice({
        invoiceDate,
        invoiceNumber,
        invoiceAmount,
        financialYear,
      });
  
      await newInvoice.save();
      res.status(201).json({ message: 'Invoice created successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to create the invoice' });
    }
  });

InvoiceRouter.get('/invoices', async (req, res) => {
    try {
      const invoices = await Invoice.find();
      res.status(200).json(invoices);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch invoices' });
    }
  });

InvoiceRouter.delete('/invoices/:invoiceNumber', async (req, res) => {
    try {
      const { invoiceNumber } = req.params;
  
      // Find the invoice by invoice number and delete it
      const deletedInvoice = await Invoice.findOneAndDelete({ invoiceNumber });
  
      if (!deletedInvoice) {
        return res.status(404).json({ error: 'Invoice not found' });
      }
  
      res.status(200).json({ message: 'Invoice deleted successfully', deletedInvoice });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete the invoice' });
    }
  });

InvoiceRouter.put('/invoices/:invoiceNumber', async (req, res) => {
    try {
      const { invoiceDate, invoiceAmount } = req.body;
      const { invoiceNumber } = req.params;
  
      // Find the invoice by invoice number and update it
      const updatedInvoice = await Invoice.findOneAndUpdate(
        { invoiceNumber },
        { invoiceDate, invoiceAmount },
        { new: true } // This ensures you get the updated invoice in the response
      );
  
      if (!updatedInvoice) {
        return res.status(404).json({ error: 'Invoice not found' });
      }
  
      res.status(200).json({ message: 'Invoice updated successfully', updatedInvoice });
    } catch (err) {
      res.status(500).json({ error: 'Failed to update the invoice' });
    }
  });
  
  module.exports = {
    InvoiceRouter
  }