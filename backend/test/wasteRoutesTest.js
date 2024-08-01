const fastify = require('fastify');
const wasteRoutes = require('../src/routes/wasteRoutes'); 
const wasteController = require('../src/controllers/wasteController');
const request = require('supertest');

jest.mock('../src/controllers/wasteController');

let app;

beforeAll(async () => {
  app = fastify();
  app.register(wasteRoutes);
  await app.ready();
});

afterAll(() => {
  app.close();
});

describe('Waste Routes', () => {
  test('GET /waste should return all waste', async () => {
    const mockWastes = [{ id: 1, name: 'Plastic' }, { id: 2, name: 'Metal' }];
    wasteController.getAllWaste.mockResolvedValue(mockWastes);

    const response = await request(app.server).get('/waste');
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockWastes);
  });

  test('POST /waste should add new waste', async () => {
    const newWaste = { id: 3, name: 'Glass' };
    wasteController.addWaste.mockResolvedValue(newWaste);

    const response = await request(app.server).post('/waste').send({ name: 'Glass' });
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual(newWaste);
  });

  test('PUT /waste/:id should update waste', async () => {
    const updatedWaste = { id: 1, name: 'Updated Plastic' };
    wasteController.updateWaste.mockResolvedValue(updatedWaste);

    const response = await request(app.server).put('/waste/1').send({ name: 'Updated Plastic' });
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedWaste);
  });

  test('DELETE /waste/:id should delete waste', async () => {
    wasteController.deleteWaste.mockResolvedValue(true);

    const response = await request(app.server).delete('/waste/1');
    
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Waste deleted successfully');
  });
});
