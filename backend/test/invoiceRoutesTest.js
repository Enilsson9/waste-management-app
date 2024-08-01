const fastify = require('fastify');
const invoiceRoutes = require('../src/routes/invoiceRoutes'); 
const invoiceController = require('../src/controllers/invoiceController');
const request = require('supertest');

jest.mock('../src/controllers/invoiceController');

let app;

beforeAll(async () => {
  app = fastify();
  app.register(invoiceRoutes);
  await app.ready();
});

afterAll(() => {
  app.close();
});

describe('Invoice Routes', () => {
  test('GET /invoices should return all invoices', async () => {
    const mockInvoices = [{ id: 1, amount: 100 }, { id: 2, amount: 200 }];
    invoiceController.getAllInvoices.mockResolvedValue(mockInvoices);

    const response = await request(app.server).get('/invoices');
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockInvoices);
  });

  test('POST /invoice should add new invoice', async () => {
    const newInvoice = { id: 3, amount: 300 };
    invoiceController.addInvoice.mockResolvedValue(newInvoice);

    const response = await request(app.server).post('/invoice').send({ amount: 300 });
    
    expect(response.status).toBe(200); // Use 201 if creating a new resource
    expect(response.body).toEqual(newInvoice);
  });

  test('PUT /invoice/:id should update invoice', async () => {
    const updatedInvoice = { id: 1, amount: 150 };
    invoiceController.updateInvoice.mockResolvedValue(updatedInvoice);

    const response = await request(app.server).put('/invoice/1').send({ amount: 150 });
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedInvoice);
  });

  test('DELETE /invoice/:id should delete invoice', async () => {
    const deleteMessage = { message: 'Invoice deleted successfully' };
    invoiceController.deleteInvoice.mockResolvedValue(deleteMessage);

    const response = await request(app.server).delete('/invoice/1');
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual(deleteMessage);
  });
});
