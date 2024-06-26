const Waste = require('../models/Waste');

// Get all wastes
async function getAllWaste() {
    const wastes = await Waste.find();
    return wastes;
}

// Add a new waste
async function addWaste(wasteData) {
    const newWaste = new Waste(wasteData);
    await newWaste.save();
    return newWaste;
}

// Update a waste by ID
async function updateWaste(id, wasteData) {
    const updatedWaste = await Waste.findByIdAndUpdate(id, wasteData, { new: true });
    return updatedWaste;
}

// Delete a waste by ID
async function deleteWaste(id) {
    const deletedWaste = await Waste.findByIdAndDelete(id);
    return deletedWaste;
}

module.exports = {
    getAllWaste,
    addWaste,
    updateWaste,
    deleteWaste
};
