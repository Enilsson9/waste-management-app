const Order = require('../models/Order');
const Invoice = require('../models/Invoice');
const Waste = require('../models/Waste');

async function getOrdersCount() {
  return await Order.countDocuments();
}

async function getPendingOrdersCount() {
  return await Order.countDocuments({ status: 'pending' });
}

async function getInvoicesCount() {
  return await Invoice.countDocuments();
}

async function getPendingInvoicesCount() {
  return await Invoice.countDocuments({ status: 'unpaid' });
}

async function getWastePrices() {
  return await Waste.find({}, { name: 1, pricePublic: 1, priceInternal: 1, priceWholesale: 1, _id: 0 });
}

async function getTotalWeightProcessed() {
  const result = await Order.aggregate([
    { $unwind: "$items" },
    { $group: { _id: null, totalWeight: { $sum: '$items.weight' } } }
  ]);
  return result[0]?.totalWeight || 0;
}

async function getRevenueGenerated() {
  const result = await Order.aggregate([
    { $match: { status: 'completed' } },
    { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } }
  ]);
  return result[0]?.totalRevenue || 0;
}

async function getTopWasteTypes() {
  const result = await Order.aggregate([
    { $unwind: "$items" },
    { $group: { _id: '$items.material', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 },
    {
      $lookup: {
        from: 'wastes',
        localField: '_id',
        foreignField: '_id',
        as: 'material'
      }
    },
    { $unwind: '$material' },
    { $project: { 'material.name': 1, count: 1 } }
  ]);
  return result.map(item => item.material.name);
}

async function getRecentActivities() {
  const recentOrders = await Order.find().sort({ timestamp: -1 }).limit(5);
  const recentInvoices = await Invoice.find().sort({ timestamp: -1 }).limit(5);

  const recentActivities = [
    ...recentOrders.map(order => ({
      activity: `New order created: ${order.orderId}`,
      timestamp: order.timestamp
    })),
    ...recentInvoices.map(invoice => ({
      activity: `Invoice #${invoice.invoiceId} created`,
      timestamp: invoice.timestamp
    }))
  ];

  return recentActivities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

module.exports = {
  getOrdersCount,
  getPendingOrdersCount,
  getInvoicesCount,
  getPendingInvoicesCount,
  getWastePrices,
  getTotalWeightProcessed,
  getRevenueGenerated,
  getTopWasteTypes,
  getRecentActivities
};
