const mongoose = require('mongoose');
const Customer = require('../models/Customer');
const Order = require('../models/Order'); 
const Invoice = require('../models/Invoice'); 


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

async function getCustomerById(id) {
    try {
      const customer = await Customer.findById(id);
      return customer;
    } catch (err) {
      throw new Error('Error fetching customer by ID');
    }
  }

  async function getCustomerOrders(customerId) {
    try {
      // Convert the string customerId to an ObjectId
      const objectId = new mongoose.Types.ObjectId(customerId);
      console.log('Fetching orders for customer ObjectId:', objectId); // Debugging log
  
      // Find orders where the customer field matches the given ObjectId
      const orders = await Order.find({ customer: objectId });
      console.log('Orders found:', orders); // Debugging log
  
      return orders;
    } catch (err) {
      console.error('Error fetching orders for customer:', err.message); // Log errors
      throw new Error('Error fetching orders for customer: ' + err.message);
    }
  }

  async function getCustomerInvoices(customerId) {
    try {
      // Convert the string customerId to an ObjectId
      const objectId = new mongoose.Types.ObjectId(customerId);
      console.log('Fetching orders for customer ObjectId:', objectId); // Debugging log
  
      // Find orders where the customer field matches the given ObjectId
      const orders = await Order.find({ customer: objectId });
      console.log('Orders found:', orders); // Debugging log
  
      if (orders.length === 0) {
        return []; // No orders found for the customer, so no invoices
      }
  
      // Extract the order IDs
      const orderIds = orders.map(order => order._id);
      console.log('Order IDs:', orderIds); // Debugging log
  
      // Find invoices where the orderId field matches any of the order IDs
      const invoices = await Invoice.find({ orderId: { $in: orderIds } });
      console.log('Invoices found:', invoices); // Debugging log
  
      return invoices;
    } catch (err) {
      console.error('Error fetching invoices for customer:', err.message); // Log errors
      throw new Error('Error fetching invoices for customer: ' + err.message);
    }
  }

module.exports = {
    getAllCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomerById,
    getCustomerOrders,
    getCustomerInvoices
};
