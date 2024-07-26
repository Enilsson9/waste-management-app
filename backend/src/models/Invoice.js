const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    invoiceId: {
        type: String,
        default: () => Math.floor(100000 + Math.random() * 900000).toString(),
        unique: true
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['cash', 'credit_card', 'bank_transfer', 'mobile_payment'],
        required: true
    },
    status: {
        type: String,
        enum: ['paid', 'unpaid', 'cancelled'],
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
        required: true
    }
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
