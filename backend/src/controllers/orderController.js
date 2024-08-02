const Order = require('../models/Order');
const Customer = require('../models/Customer');
const Waste = require('../models/Waste');

// Helper function to calculate total price
async function calculateTotalPrice(order) {
    const customer = await Customer.findById(order.customer);
    if (!customer) {
        throw new Error('Customer not found');
    }

    let totalPrice = 0;
    for (const item of order.items) {
        const waste = await Waste.findById(item.material);
        if (!waste) {
            throw new Error('Waste material not found');
        }

        let pricePerKg;
        switch (customer.type) {
            case 'public':
                pricePerKg = waste.pricePublic;
                break;
            case 'internal':
                pricePerKg = waste.priceInternal;
                break;
            case 'wholesale':
                pricePerKg = waste.priceWholesale;
                break;
            default:
                throw new Error('Invalid customer type');
        }

        totalPrice += item.weight * pricePerKg;
    }

    return totalPrice;
}

// Get all orders
async function getAllOrders() {
    const orders = await Order.find().populate('customer').populate('items.material');
    return orders;
}

// Add a new order
async function addOrder(orderData) {
    const newOrder = new Order(orderData);
    newOrder.totalPrice = await calculateTotalPrice(newOrder);
    await newOrder.save();
    const populatedOrder = await Order.findById(newOrder._id).populate('customer').populate('items.material');
    return populatedOrder;
}

// Update an order by ID
async function updateOrder(id, orderData) {
    const updatedOrder = await Order.findByIdAndUpdate(id, orderData, { new: true });
    if (!updatedOrder) {
        throw new Error('Order not found');
    }
    updatedOrder.totalPrice = await calculateTotalPrice(updatedOrder);
    await updatedOrder.save();
    const populatedOrder = await Order.findById(updatedOrder._id).populate('customer').populate('items.material');
    return populatedOrder;
}

// Delete an order by ID
async function deleteOrder(id) {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
        throw new Error('Order not found');
    }
    return { message: 'Order deleted successfully' };
}

async function getOrderById(id) {
    try {
      const order = await Order.findById(id).populate('customer').populate('items.material');
      return order;
    } catch (err) {
      throw new Error('Error fetching order by ID');
    }
  }

  
module.exports = {
    getAllOrders,
    addOrder,
    updateOrder,
    deleteOrder,
    getOrderById
};
