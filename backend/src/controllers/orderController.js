const Order = require('../models/Order');

// Get all Orders
async function getAllOrders() {
    const Orders = await Order.find();
    return Orders;
}

// Add a new Order
async function addOrder(OrderData) {
    const newOrder = new Order(OrderData);
    await newOrder.save();
    return newOrder;
}

// Update a Order by ID
async function updateOrder(id, OrderData) {
    const updatedOrder = await Order.findByIdAndUpdate(id, OrderData, { new: true });
    return updatedOrder;
}

// Delete a Order by ID
async function deleteOrder(id) {
    const deletedOrder = await Order.findByIdAndDelete(id);
    return deletedOrder;
}

module.exports = {
    getAllOrders,
    addOrder,
    updateOrder,
    deleteOrder
};
