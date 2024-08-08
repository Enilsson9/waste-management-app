const summaryController = require('../controllers/summaryController');

const summaryRoutes = async (fastify, options) => {
  fastify.get('/summary', async (request, reply) => {
    try {
      const ordersCount = await summaryController.getOrdersCount();
      const pendingOrdersCount = await summaryController.getPendingOrdersCount();
      const invoicesCount = await summaryController.getInvoicesCount();
      const pendingInvoicesCount = await summaryController.getPendingInvoicesCount();
      const wastePrices = await summaryController.getWastePrices();
      const totalWeightProcessed = await summaryController.getTotalWeightProcessed();
      const revenueGenerated = await summaryController.getRevenueGenerated();
      const topWasteTypes = await summaryController.getTopWasteTypes();
      const recentActivities = await summaryController.getRecentActivities();

      return {
        orders: {
          total: ordersCount,
          pending: pendingOrdersCount,
          completed: ordersCount - pendingOrdersCount
        },
        invoices: {
          total: invoicesCount,
          pending: pendingInvoicesCount,
          completed: invoicesCount - pendingInvoicesCount
        },
        wastePrices: wastePrices,
        totalWeightProcessed: totalWeightProcessed,
        revenueGenerated: revenueGenerated,
        topWasteTypes: topWasteTypes,
        recentActivities: recentActivities
      };
    } catch (error) {
      reply.send(error);
    }
  });
};

module.exports = summaryRoutes;
