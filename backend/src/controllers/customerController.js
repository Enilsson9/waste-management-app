const Customer = require('../models/Customer');

// Get all customers
async function getAllCustomers() {
    const customers = await Waste.find();
    return customers;
}

// Add a new waste
async function addCustomer(wasteData) {
    const newCustomer = new Customer(wasteData);
    await newWaste.save();
    return newWaste;
}

// Update a Customer by ID
async function updateCustomer(id, wasteData) {
    const updatedCustomer = await Customer.findByIdAndUpdate(id, wasteData, { new: true });
    return updatedWaste;
}

// Delete a Customer by ID
async function deleteCustomer(id) {
    const deletedCustomer = await Customer.findByIdAndDelete(id);
    return deletedWaste;
}

module.exports = {
    getAllCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer
};
