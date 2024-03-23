const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../server'); // Update the path if necessary
const Enrollment = require('../models/enrollment');
const Timetable = require('../models/timetable');

// Static student and course IDs
const studentId = '65f1e6ad75759adbc2a17d15';
const courseId = '65fe84fe25d5673b0263383e';

// Static token for authentication
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWYxZTZhZDc1NzU5YWRiYzJhMTdkMTUiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3MTA3ODQxOTgsImV4cCI6MTcxMTM4ODk5OH0.1AFLYBKrC9ovFFD2tEjUZjUhiAF2wSknNGrdW-ML7vQ';

// Connect to the database before each test suite
beforeAll(async () => {
  await mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Clear the database before each test
beforeEach(async () => {
  await Enrollment.deleteMany();
  await Timetable.deleteMany();
});

// Close the database connection after each test suite
afterAll(async () => {
  await mongoose.connection.close();
});

describe('Enrollment Routes', () => {
    it('should enroll a student in a course', async () => {
        const res = await request(app)
          .post('/api/v1/enrollments')
          .set('Authorization', `Bearer ${token}`)
          .send({ courseId });
      
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('enrollment');
        expect(res.body.enrollment.student).toBe(studentId); // Make sure studentId is correct
        expect(res.body.enrollment.course).toBe(courseId);
      });

  it('should get timetable for enrolled students', async () => {
    const res = await request(app)
      .get('/api/v1/enrollments/timetable')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    // Add more expectations based on the expected timetable structure
  });

  it('should view all student enrollments (for admins and faculty)', async () => {
    const res = await request(app)
      .get('/api/v1/enrollments')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    // Add more expectations based on the expected response structure
  });

  it('should remove a student enrollment (for admins and faculty)', async () => {
    // First, create a sample enrollment
    const enrollment = await Enrollment.create({ student: studentId, course: courseId });
  
    const res = await request(app)
      .delete(`/api/v1/enrollments/${enrollment._id}`)
      .set('Authorization', `Bearer ${token}`);
  
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Enrollment removed successfully');
  });
});
