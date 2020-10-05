const request = require('supertest');
const app = require('../../app');

describe('GET /starship', () => {
  it('should response status code 200', async () => {
    const response = await request(app)
      .get('/starship')
      .set('Authorization', `Basic ${process.env.API_TOKEN}`);
    expect(response.statusCode).toBe(200);
  });
});

describe('POST /starship', () => {
  it('should response status code 200', async () => {
    const newStarship = {
      name: 'navigator10',
      model: 's9',
      manufacturer: 'nokia',
      passengers: '1',
    };

    const response = await request(app).post('/starship').send(newStarship);
    expect(response.statusCode).toBe(200);
  });

  it('should response status code 409', async () => {
    const newStarship = {
      name: 'navigator10',
      model: 's9',
      manufacturer: 'nokia',
      passengers: '1',
    };

    const response = await request(app).post('/starship').send(newStarship);
    expect(response.statusCode).toBe(409);
  });

  it('should response status code 422', async () => {
    const newStarship = {
      name: 'navigator11',
      model: 's9',
    };

    const response = await request(app).post('/starship').send(newStarship);
    expect(response.statusCode).toBe(422);
  });
});
