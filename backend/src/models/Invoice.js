const mongoose = require('mongoose');

const wasteSchema = new mongoose.Schema({
    order: {
        type: String,
        required: true
    },
    payment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Invoice = mongoose.model('Invoice', wasteSchema);

module.exports = Invoice;
