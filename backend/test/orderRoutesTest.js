const fastify = require('fastify');
const orderRoutes = require('../src/routes/orderRoutes'); 
const orderController = require('../src/controllers/orderController');
const request = require('supertest');

jest.mock('../src/controllers/orderController');

let app;

beforeAll(async () => {
  app = fastify();
  app.register(orderRoutes);
  await app.ready();
});

afterAll(() => {
  app.close();
});

describe('Order Routes', () => {
  test('GET /orders should return all orders', async () => {
    const mockOrders = [{ id: 1, item: 'Paper', quantity: 10 }, { id: 2, item: 'Plastic', quantity: 5 }];
    orderController.getAllOrders.mockResolvedValue(mockOrders);

    const response = await request(app.server).get('/orders');
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockOrders);
  });

  test('POST /order should add new order', async () => {
    const newOrder = { id: 3, item: 'Metal', quantity: 20 };
    orderController.addOrder.mockResolvedValue(newOrder);

    const response = await request(app.server).post('/order').send({ item: 'Metal', quantity: 20 });
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual(newOrder);
  });

  test('PUT /order/:id should update order', async () => {
    const updatedOrder = { id: 1, item: 'Updated Paper', quantity: 15 };
    orderController.updateOrder.mockResolvedValue(updatedOrder);

    const response = await request(app.server).put('/order/1').send({ item: 'Updated Paper', quantity: 15 });
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedOrder);
  });

  test('DELETE /order/:id should delete order', async () => {
    const deleteMessage = { message: 'Order deleted successfully' };
    orderController.deleteOrder.mockResolvedValue(deleteMessage);

    const response = await request(app.server).delete('/order/1');
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual(deleteMessage);
  });
});
