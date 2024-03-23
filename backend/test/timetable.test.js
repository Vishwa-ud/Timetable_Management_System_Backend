const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../server');
const Timetable = require('../models/timetable');

beforeAll(async () => {
  await mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Timetable Router', () => {
  beforeEach(async () => {
    await Timetable.deleteMany();
  });

  it('should create a new timetable entry', async () => {
    const timetableEntryData = {
      year: 2024,
      semester: 'Y3 Semester 1',
      Monday: [
        {
          course: '65fe7732ee1e87efa86cf147',
          type: 'Lecture',
          deliveryMethod: 'Hybrid',
          timeSlot: '09:00 - 11:00',
          classroom: '65f9557b20708269b3830262',
        },
      ],
      Tuesday: [
          {
              "course": "65fe7732ee1e87efa86cf147",
              "type": "Lecture",
              "deliveryMethod": "Physical",
              "timeSlot": "09:00 - 11:00",
              "classroom": "65f9557b20708269b3830262"
          }
      ],Wednesday: [
        {
            "course": "65fe7732ee1e87efa86cf147",
            "type": "Lecture",
            "deliveryMethod": "Physical",
            "timeSlot": "09:00 - 11:00",
            "classroom": "65f9557b20708269b3830262"
        }
    ],
    Thursday: [
        {
            "course": "65fe7732ee1e87efa86cf147",
            "type": "Lecture",
            "deliveryMethod": "Physical",
            "timeSlot": "09:00 - 11:00",
            "classroom": "65f9557b20708269b3830262"
        }
    ],
    Tuesday: [
        {
            "course": "65fe7732ee1e87efa86cf147",
            "type": "Lecture",
            "deliveryMethod": "Physical",
            "timeSlot": "09:00 - 11:00",
            "classroom": "65f9557b20708269b3830262"
        }
    ],
    Friday: [
        {
            "course": "65fe7732ee1e87efa86cf147",
            "type": "Lecture",
            "deliveryMethod": "Physical",
            "timeSlot": "09:00 - 11:00",
            "classroom": "65f9557b20708269b3830262"
        }
    ],
    Saturday: [
        {
            "course": "65fe7732ee1e87efa86cf147",
            "type": "Lecture",
            "deliveryMethod": "Physical",
            "timeSlot": "09:00 - 11:00",
            "classroom": "65f9557b20708269b3830262"
        }
    ],
    Sunday: [
        {
            "course": "65fe7732ee1e87efa86cf147",
            "type": "Lecture",
            "deliveryMethod": "Physical",
            "timeSlot": "09:00 - 11:00",
            "classroom": "65f9557b20708269b3830262"
        }
    ]
    };

    const res = await request(app)
      .post('/api/v1/timetables')
      .send(timetableEntryData);

    expect(res.statusCode).toBe(201);
  });

  describe("GET /api/v1/resources", () => {
    it("should return all resources", async () => {
      const res = await request(app).get("/api/v1/resources");
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
      // Optionally, you can check if the response body contains the expected properties for each resource
      // For example, if each resource should have a 'name' property:
      // expect(res.body[0]).toHaveProperty("name");
    });
  });
  

});
