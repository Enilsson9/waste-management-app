const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    material: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Waste',
        required: true
    },
    weight: {
        type: Number,
        required: true
    }
});

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        default: () => Math.floor(100000 + Math.random() * 900000).toString(),
        unique: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    items: [itemSchema],
    status: {
        type: String,
        enum: ['pending', 'completed', 'canceled'],
        default: 'pending',
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
