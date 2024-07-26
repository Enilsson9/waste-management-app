const mongoose = require('mongoose');

const wasteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    pricePublic: {
        type: Number,
        required: true
    },
    priceInternal: {
        type: Number,
        required: true
    },
    priceWholesale: {
        type: Number,
        required: true
    }
});

const Waste = mongoose.model('Waste', wasteSchema);

module.exports = Waste;
