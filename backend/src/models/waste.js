const mongoose = require('mongoose');

const WasteSchema = new mongoose.Schema({
    type: String,
    weight: Number,
    collectedAt: Date,
});

module.exports = mongoose.model('Waste', WasteSchema);
