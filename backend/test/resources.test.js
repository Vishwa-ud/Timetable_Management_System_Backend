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

  describe("GET /api/v1/resources", () => {
    it("should return all resources", async () => {
      const res = await request(app).get("/api/v1/resources");
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });
  

  describe("POST /api/v1/resources", () => {
    it("should create a resources", async () => {
      const res = await request(app).post("/api/v1/resources").send({
        name: "test resources 4",
        quantity: 100,
      });
      expect(res.statusCode).toBe(201);
      expect(res.body.name).toBe("test resources 4");
    });
  });

  describe("GET /api/v1/resources/:id", () => {
    it("should return a resources by id ", async () => {
      const res = await request(app).get(
        "/api/v1/resources/65fdde5339bbd7b679594dcc"
      );
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe("test resources 3");
    });
  });

  describe("PATCH /api/v1/resources/:id", () => {
    it("should update a resources", async () => {
      const res = await request(app)
        .put("/api/v1/resources/65fdde5339bbd7b679594dcc")
        .send({
          name: "test resources 5",
          quantity: 102,
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.quantity).toBe(102);
    });
  });

  describe("DELETE /api/v1/resources/:id", () => {
    it("should delete a resources", async () => {
      const res = await request(app).delete(
        "/api/v1/resources/65fdde5339bbd7b679594dcc"
      );
      expect(res.statusCode).toBe(200);
    });
  });
  

  
  
 