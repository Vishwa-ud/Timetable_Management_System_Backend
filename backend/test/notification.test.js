const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../server'); // Update the path if necessary
const Notification = require('../models/notification');

const { Types: { ObjectId } } = mongoose;

// Connect to the database before each test suite
beforeAll(async () => {
  await mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Clear the database before each test
beforeEach(async () => {
  await Notification.deleteMany();
});

// Close the database connection after each test suite
afterAll(async () => {
  await mongoose.connection.close();
});

describe('Notification Routes', () => {
  it('should create a notification', async () => {
    const notificationData = {
      title: 'Test Notification',
      message: 'This is a test notification',
      type: 'announcement',
      recipients: ['65fe705807c3d6eb00b84b10', '65fe6df546080f4eef728be4']
    };

    const res = await request(app)
      .post('/api/v1/notifications')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWYxZTZhZDc1NzU5YWRiYzJhMTdkMTUiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3MTA3ODQxOTgsImV4cCI6MTcxMTM4ODk5OH0.1AFLYBKrC9ovFFD2tEjUZjUhiAF2wSknNGrdW-ML7vQ')
      .send(notificationData);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'Notification Created Successfully');
    expect(res.body).toHaveProperty('notifications');
    expect(res.body.notifications).toHaveLength(notificationData.recipients.length);
  });

  it('should update a notification by ID', async () => {
    // First, create a sample notification with a known recipient ObjectId
    const recipientId = new ObjectId(); // Generate a valid ObjectId
    const notification = await Notification.create({
      title: 'Old Title',
      message: 'Old Message',
      type: 'announcement',
      recipient: recipientId
    });
  
    const updatedData = {
      title: 'Updated Title',
      message: 'Updated Message',
      type: 'announcement',
      recipient: recipientId // Use the same recipient ObjectId
    };
  
    const res = await request(app)
      .patch(`/api/v1/notifications/${notification._id}`)
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWYxZTZhZDc1NzU5YWRiYzJhMTdkMTUiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3MTA3ODQxOTgsImV4cCI6MTcxMTM4ODk5OH0.1AFLYBKrC9ovFFD2tEjUZjUhiAF2wSknNGrdW-ML7vQ')
      .send(updatedData);
  
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Notification Updated Successfully');
    expect(res.body).toHaveProperty('notification');
    expect(res.body.notification.title).toBe(updatedData.title);
    expect(res.body.notification.message).toBe(updatedData.message);
    expect(res.body.notification.type).toBe(updatedData.type);
    expect(res.body.notification.recipient).toBe(updatedData.recipient.toString()); // Convert ObjectId to string for comparison
  });
  it('should delete a notification by ID', async () => {
    // First, create a sample notification
    const notification = await Notification.create({
      title: 'Test Notification',
      message: 'This is a test notification',
      type: 'announcement',
      recipient: new ObjectId() // Generate a valid ObjectId
    });

    const res = await request(app)
      .delete(`/api/v1/notifications/${notification._id}`)
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWYxZTZhZDc1NzU5YWRiYzJhMTdkMTUiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3MTA3ODQxOTgsImV4cCI6MTcxMTM4ODk5OH0.1AFLYBKrC9ovFFD2tEjUZjUhiAF2wSknNGrdW-ML7vQ');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Notification deleted successfully');
  });
});
