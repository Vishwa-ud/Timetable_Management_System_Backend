const request = require("supertest");
const express = require("express");
const bcrypt = require("bcrypt");
const authRouter = require("../routes/auth");

jest.mock("../models/user");
jest.mock("bcrypt");
jest.mock("../routes/logger");

const app = express();
app.use(express.json());
app.use("/api/v1/auth", authRouter);

describe("Authentication Router", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 401 if email or password is invalid", async () => {
    // Mock user not found scenario
    require("../models/user").User.findOne.mockResolvedValue(null);

    const res = await request(app)
      .post("/api/v1/auth")
      .send({ email: "nonexistent@example.com", password: "password" });

    expect(res.statusCode).toBe(401);
  });


  it("should return 200 with token if login is successful", async () => {
    // Mock user data and bcrypt compare function
    const mockUser = {
      email: "joe.k@example.com",
      password: "hashedPassword", // Mock hashed password
      role: "Admin",
      generateAuthToken: jest.fn().mockReturnValue("mockToken"),
    };
    const mockReqBody = {
      email: "joe.k@example.com",
      password: "Password@123", // Plain text password
    };
    const mockCompare = jest.fn().mockResolvedValue(true);

    // Mock logger info function
    const mockLoggerInfo = jest.fn();

    // Set up mocks
    require("../models/user").User.findOne.mockResolvedValue(mockUser);
    require("bcrypt").compare.mockImplementation(mockCompare);
    require("../routes/logger").logger.info = mockLoggerInfo;

    // Send request to login endpoint
    const res = await request(app)
      .post("/api/v1/auth")
      .send(mockReqBody);

    // Assertions
    expect(res.statusCode).toBe(200);
    expect(res.body.data.token).toBe("mockToken");
    expect(mockLoggerInfo).toHaveBeenCalledWith(
      "Login successful for user:",
      mockReqBody.email
    );
  });
});
