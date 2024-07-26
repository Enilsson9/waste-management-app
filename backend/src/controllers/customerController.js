const Customer = require('../models/Customer');

const getAllCustomers = async () => {
    try {
        const customers = await Customer.find();
        return customers;
    } catch (error) {
        throw new Error(`Error fetching customers: ${error.message}`);
    }
};

const addCustomer = async (customerData) => {
    try {
        const newCustomer = new Customer(customerData);
        await newCustomer.save();
        return newCustomer;
    } catch (error) {
        throw new Error(`Error adding customer: ${error.message}`);
    }
};

const updateCustomer = async (id, customerData) => {
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(id, customerData, { new: true });
        if (!updatedCustomer) {
            throw new Error('Customer not found');
        }
        return updatedCustomer;
    } catch (error) {
        throw new Error(`Error updating customer: ${error.message}`);
    }
};

const deleteCustomer = async (id) => {
    try {
        const deletedCustomer = await Customer.findByIdAndDelete(id);
        if (!deletedCustomer) {
            throw new Error('Customer not found');
        }
        return { message: 'Customer deleted successfully' };
    } catch (error) {
        throw new Error(`Error deleting customer: ${error.message}`);
    }
};

module.exports = {
    getAllCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer
};
