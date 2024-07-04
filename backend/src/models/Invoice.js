const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    order: {
        type: String,
        required: true
    },
    payment: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
