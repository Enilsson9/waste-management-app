const Invoice = require('../models/Invoice');
const Order = require('../models/Order');

// Get all invoices
async function getAllInvoices() {
    const invoices = await Invoice.find().populate({
        path: 'orderId',
        populate: {
            path: 'customer items.material',
        }
    });
    return invoices;
}

// Add a new invoice
async function addInvoice(invoiceData) {
    const newInvoice = new Invoice(invoiceData);
    await newInvoice.save();
    const populatedInvoice = await Invoice.findById(newInvoice._id).populate({
        path: 'orderId',
        populate: {
            path: 'customer items.material',
        }
    });
    return populatedInvoice;
}

// Update an invoice by ID
async function updateInvoice(id, invoiceData) {
    const updatedInvoice = await Invoice.findByIdAndUpdate(id, invoiceData, { new: true });
    if (!updatedInvoice) {
        throw new Error('Invoice not found');
    }
    const populatedInvoice = await Invoice.findById(updatedInvoice._id).populate({
        path: 'orderId',
        populate: {
            path: 'customer items.material',
        }
    });
    return populatedInvoice;
}

// Delete an invoice by ID
async function deleteInvoice(id) {
    const deletedInvoice = await Invoice.findByIdAndDelete(id);
    if (!deletedInvoice) {
        throw new Error('Invoice not found');
    }
    return { message: 'Invoice deleted successfully' };
}

async function getInvoiceById(id) {
    try {
      const invoice = await Invoice.findById(id);
      return invoice;
    } catch (err) {
      throw new Error(`Error fetching invoice by ID: ${err.message}`);
    }
  }

module.exports = {
    getAllInvoices,
    addInvoice,
    updateInvoice,
    deleteInvoice,
    getInvoiceById
};
