const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../server"); // Make sure this path is correct
require("dotenv").config();

const { User, validate } = require("../models/user"); // Make sure this path is correct
const joi = require("joi");

/* Connecting to the database before each test. */
beforeAll(async () => {
  await mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

/* Closing database connection after all tests. */
afterAll(async () => {
  await mongoose.connection.close();
});

describe("User Model", () => {
  it("should create a new user instance with valid data", () => {
    const userData = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      password: "Password@123",
      role: "Student",
    };

    const user = new User(userData);
    expect(user).toMatchObject(userData);
  });
});

describe("User Validation", () => {
  it("should return no error for valid user data", () => {
    const userData = {
      firstName: "Joe",
      lastName: "M",
      email: "joe.m@example.com",
      password: "Password@123",
      role: "Student",
    };

    const { error } = validate(userData);
    expect(error).toBeFalsy();
  });

  it("should return error for missing required fields", () => {
    const userData = {
      // Missing firstName
      lastName: "Doe",
      email: "john@example.com",
      password: "Password123",
      role: "Student",
    };

    const { error } = validate(userData);
    expect(error).toBeTruthy();
    expect(error.details[0].message).toMatch(/First Name/);
  });

});


describe("POST /api/v1/users", () => {
    it("should create a user", async () => {
      const res = await request(app).post("/api/v1/users").send({
      firstName: "Joe",
      lastName: "koe",
      email: "joe.k@example.com",
      password: "Password@123",
      role: "Admin",
      });
      expect(res.statusCode).toBe(201);
    });
  });

  

