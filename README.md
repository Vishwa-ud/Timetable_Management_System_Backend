# University Timetable Management System
---

 RESTful API for managing a university's timetable system Backend



### Request methods

The request method is the way we distinguish what kind of action our endpoint is being "asked" to perform. For example, `GET` pretty much gives itself. But we also have a few other methods that we use quite often.

| Method   | Description                              |
| -------- | ---------------------------------------- |
| `GET`    | Used to retrieve a single item or a collection of items. |
| `POST`   | Used when creating new items e.g. a new user, post, comment etc. |
| `PATCH`  | Used to update one or more fields on an item e.g. update e-mail of user. |
| `PUT`    | Used to replace a whole item (all fields) with new data. |
| `DELETE` | Used to delete an item.                  |


Register User
```http
POST http://localhost:8080/api/users
```

# Tech Stack
• Node.js
• Express.js
• MongoDb
•JavaScript

# Main Features

1. User Roles and Authentication:
• Define multiple user roles (e.g., Admin, Faculty, Student) with different access 
levels.
• Implement secure login functionality and session management using JWT.
2. Course Management:
• Allow CRUD operations on courses, including course name, code, description, and 
credits.
• Enable Admins to assign Faculty to courses.
3. Timetable Management:
• Facilitate the creation and modification of weekly timetables for different courses.
• Include functionality to add, update, and delete class sessions, specifying the 
course, time, faculty, and location.
4. Room and Resource Booking:
• Manage classrooms and resources (e.g., projectors, labs) availability.
• Allow booking of rooms and resources for classes or events, ensuring no overlaps.
5. Student Enrollment:
• Enable students to enroll in courses and view their timetables.
• Allow Faculty and Admins to view and manage student enrollments in courses.
6. Notifications and Alerts:
• Implement a system to notify users of timetable changes, room changes, or 
important announcements.

---

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/MhkFIDKy)
