const Invoice = require('../models/Invoice');

// Get all Invoices
async function getAllInvoices() {
    const Invoices = await Invoice.find();
    return Invoices;
}

// Add a new Invoice
async function addInvoice(InvoiceData) {
    const newInvoice = new Invoice(InvoiceData);
    await newInvoice.save();
    return newInvoice;
}

// Update a Invoice by ID
async function updateInvoice(id, InvoiceData) {
    const updatedInvoice = await Invoice.findByIdAndUpdate(id, InvoiceData, { new: true });
    return updatedInvoice;
}

// Delete a Invoice by ID
async function deleteInvoice(id) {
    const deletedInvoice = await Invoice.findByIdAndDelete(id);
    return deletedInvoice;
}

module.exports = {
    getAllInvoices,
    addInvoice,
    updateInvoice,
    deleteInvoice
};
