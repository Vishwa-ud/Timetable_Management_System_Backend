const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../server'); // Update the path if necessary
const Classroom = require('../models/classroom');
const Resource = require('../models/resource');
const Booking = require('../models/booking');

// Connect to the database before each test suite
beforeAll(async () => {
  await mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Clear the database before each test
beforeEach(async () => {
  await Classroom.deleteMany();
  await Resource.deleteMany();
  await Booking.deleteMany();
});

// Close the database connection after each test suite
afterAll(async () => {
  await mongoose.connection.close();
});

describe('Booking Routes', () => {
    it('should create a new booking', async () => {
      const classroom = await Classroom.create({ classID: 'Room A', type: 'Lab', capacity: 30 });
      const resource = await Resource.create({ name: 'Seats', quantity: 20 });
      
      const bookingData = {
        classroomID: classroom._id,
        resources: [resource._id],
        date: '2024-03-26',
        startTime: '09:00',
        endTime: '11:00'
      };
  
      const res = await request(app)
        .post('/api/v1/bookings')
        .send(bookingData);
  
      expect(res.statusCode).toBe(200); // Change to 200 if server returns 200 for successful creation
      expect(res.body.booking).toHaveProperty('_id');
      expect(res.body.booking.classroom).toBe(classroom._id.toString());
      expect(res.body.booking.resources).toEqual(expect.arrayContaining([resource._id.toString()]));
      expect(new Date(res.body.booking.date).toISOString().split('T')[0]).toBe(bookingData.date); // Adjusted comparison
      expect(res.body.booking.startTime).toBe(bookingData.startTime);
      expect(res.body.booking.endTime).toBe(bookingData.endTime);
    });
  
    it('should return error when classroom does not exist', async () => {
      const resource = await Resource.create({ name: 'Seats', quantity: 20 });
      
      const bookingData = {
        classroomID: new mongoose.Types.ObjectId(), // Correct usage of ObjectId
        resources: [resource._id],
        date: '2024-03-26',
        startTime: '09:00',
        endTime: '11:00'
      };
  
      const res = await request(app)
        .post('/api/v1/bookings')
        .send(bookingData);
  
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('Classroom not found');
    });
  });
  
  