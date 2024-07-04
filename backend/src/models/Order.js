const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    typeOfWaste: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
