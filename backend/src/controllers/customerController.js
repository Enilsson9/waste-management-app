const Customer = require('../models/Customer');

// Get all customers
async function getAllCustomers() {
    const customers = await Customer.find();
    return customers;
}

// Add a new waste
async function addCustomer(data) {
    const newCustomer = new Customer(data);
    await newCustomer.save();
    return newCustomer;
}

// Update a Customer by ID
async function updateCustomer(id, data) {
    const updatedCustomer = await Customer.findByIdAndUpdate(id, data, { new: true });
    return updatedCustomer;
}

// Delete a Customer by ID
async function deleteCustomer(id) {
    const deletedCustomer = await Customer.findByIdAndDelete(id);
    return deletedCustomer;
}

module.exports = {
    getAllCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer
};
