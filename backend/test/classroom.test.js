const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../server");

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.DB);
});
  
/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});

describe("Booking Routes", () => {
    it("should create a new booking", async () => {
        const bookingData = {
            classroomID: "65fe83ab73c157ccc55515a3",
            resources: ["65fe82f239ab433d7b080b7d"],
            date: "2024-03-26",
            startTime: "09:00",
            endTime: "11:00"
        };

        const res = await request(app)
            .post("/api/v1/bookings")
            .send(bookingData);

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("_id");
        expect(res.body.classroomID).toBe(bookingData.classroomID);
        // Add more assertions as needed
    });

    it("should return error when classroom does not exist", async () => {
        const bookingData = {
            classroomID: "65fe82f239ab433d7b080b7d",
            resources: ["65fe82f239ab433d7b080b7d"],
            date: "2024-03-26",
            startTime: "09:00",
            endTime: "11:00"
        };

        const res = await request(app)
            .post("/api/v1/bookings")
            .send(bookingData);

        expect(res.statusCode).toBe(404);
        // Add more assertions as needed
    });

    // Add more test cases for other routes (GET, PATCH, DELETE) as needed
});
