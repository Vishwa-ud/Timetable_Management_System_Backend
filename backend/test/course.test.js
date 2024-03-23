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

describe("GET /api/v1/courses", () => {
    it("should return all courses", async () => {
        const res = await request(app).get("/api/v1/courses");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
});

describe("POST /api/v1/courses", () => {
    it("should create a course", async () => {
        const courseData = {
            name: "ITP",
            code: "ITP101",
            description: "ITP",
            credits: 3
        };
        const res = await request(app).post("/api/v1/courses").send(courseData);
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe("Course created successfully!");
    });
});

describe("PATCH /api/v1/courses/:id", () => {
    it("should update a course", async () => {
        const courseId = "65fe7732ee1e87efa86cf147"; // Replace with a valid course ID from your database
        const updatedCourseData = {
            name: "Updated Mathematics",
            code: "MATH101",
            description: "Updated Introduction to Mathematics",
            credits: 4
        };
        const res = await request(app).patch(`/api/v1/courses/${courseId}`).send(updatedCourseData);
        expect(res.statusCode).toBe(200);
        // Add assertions for other properties of the updated course
    });
});

describe("DELETE /api/v1/courses/:id", () => {
    it("should delete a course", async () => {
        const courseId = "65fe7732ee1e87efa86cf147"; // Replace with a valid course ID from your database
        const res = await request(app).delete(`/api/v1/courses/${courseId}`);
        expect(res.statusCode).toBe(200);
    });
});





