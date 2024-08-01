const fastify = require('fastify');
const customerRoutes = require('../src/routes/customerRoutes'); 
const customerController = require('../src/controllers/customerController');
const request = require('supertest');

jest.mock('../src/controllers/customerController');

let app;

beforeAll(async () => {
  app = fastify();
  app.register(customerRoutes);
  await app.ready();
});

afterAll(() => {
  app.close();
});

describe('Customer Routes', () => {
  test('GET /customers should return all customers', async () => {
    const mockCustomers = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }];
    customerController.getAllCustomers.mockResolvedValue(mockCustomers);

    const response = await request(app.server).get('/customers');
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockCustomers);
  });

  test('POST /customer should add new customer', async () => {
    const newCustomer = { id: 3, name: 'New Customer' };
    customerController.addCustomer.mockResolvedValue(newCustomer);

    const response = await request(app.server).post('/customer').send({ name: 'New Customer' });
    
    expect(response.status).toBe(201);
    expect(response.body).toEqual(newCustomer);
  });

  test('PUT /customer/:id should update customer', async () => {
    const updatedCustomer = { id: 1, name: 'Updated Customer' };
    customerController.updateCustomer.mockResolvedValue(updatedCustomer);

    const response = await request(app.server).put('/customer/1').send({ name: 'Updated Customer' });
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedCustomer);
  });

  test('DELETE /customer/:id should delete customer', async () => {
    const deleteMessage = { message: 'Customer deleted successfully' };
    customerController.deleteCustomer.mockResolvedValue(deleteMessage);

    const response = await request(app.server).delete('/customer/1');
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual(deleteMessage);
  });
});
