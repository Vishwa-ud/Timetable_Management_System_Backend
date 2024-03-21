# University Timetable Management System
---

 RESTful API for managing a university's timetable system Backend

# Tech Stack
• Node.js
• Express.js
• MongoDb
• JavaScript

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


### Request methods

The request method is the way we distinguish what kind of action our endpoint is being "asked" to perform. For example, `GET` pretty much gives itself. But we also have a few other methods that we use quite often.

| Method   | Description                              |
| -------- | ---------------------------------------- |
| `GET`    | Used to retrieve a single item or a collection of items. |
| `POST`   | Used when creating new items e.g. a new user, post, comment etc. |
| `PATCH`  | Used to update one or more fields on an item e.g. update e-mail of user. |
| `PUT`    | Used to replace a whole item (all fields) with new data. |
| `DELETE` | Used to delete an item.                  |

## User Roles and Authentication

#### User Register

| Method   | URL                                      | Description                              |
| -------- | ---------------------------------------- | ---------------------------------------- |
| `POST`   | `http://localhost:8080/api/users/`        | Create a new User Registration.         |

example:

#### User Login

| Method   | URL                                      | Description                              |
| -------- | ---------------------------------------- | ---------------------------------------- |
| `POST`   | `http://localhost:8080/api/auth/`        |  User Login.                             |

example:

#### Role Access

| Method   | URL                                      | Description                              |
| -------- | ---------------------------------------- | ---------------------------------------- |
| `GET`    | `http://localhost:8080/api/users/admin/dashboard`    | Access Granted Admin Dashbord   |
| `GET`    | `http://localhost:8080/api/users/faculty/dashboard`  | Access Granted Faculty Dashbord |
| `GET`    | `http://localhost:8080/api/users/student/dashboard`  | Access Granted Student Dashbord |

example:

The authorized user’s token. This is used to gain access to protected endpoint.

| Header key        | Description                              |
| ----------------- | ---------------------------------------- |
| `Authorization`   | Bearer <Token>                           |

#### Course

| Method   | URL                                      | Description                              |
| -------- | ---------------------------------------- | ---------------------------------------- |
| `GET`    | `http://localhost:8080/api/courses/`     | Retrieve all course.                     |
| `POST`   | `http://localhost:8080/api/courses/`     | Create a new User Registration.          |
| `GET`    | `http://localhost:8080/api/courses/:id`  | Retrieve course by ID.                   |
| `PATCH`  | `http://localhost:8080/api/courses/:id`  | Update course by ID.                     |
| `DELETE` | `http://localhost:8080/api/courses/:id`  | Delete course by ID.                     |


#### Timetables

| Method   | URL                                      | Description                              |
| -------- | ---------------------------------------- | ---------------------------------------- |
| `GET`    | `http://localhost:8080/api/timetables/`    | Retrieve all Timetables.                 |
| `POST`   | `http://localhost:8080/api/timetables/`    | Create a new Timetable.                  |
| `GET`    | `http://localhost:8080/api/timetables/:id` | Retrieve Timetable by ID.                |
| `PATCH`  | `http://localhost:8080/api/timetables/:id` | Update Timetable by ID.                  |
| `DELETE` | `http://localhost:8080/api/timetables/:id` | Delete Timetable by ID.                  |


#### Classroom

| Method   | URL                                      | Description                              |
| -------- | ---------------------------------------- | ---------------------------------------- |
| `GET`    | `http://localhost:8080/api/classrooms/`    | Retrieve all Classrooms.               |
| `POST`   | `http://localhost:8080/api/classrooms/`    | Create a new Classroom.                |
| `GET`    | `http://localhost:8080/api/classrooms/:id` | Retrieve Classroom by ID.              |
| `PATCH`  | `http://localhost:8080/api/classrooms/:id` | Update Classroom by ID.                |
| `DELETE` | `http://localhost:8080/api/classrooms/:id` | Delete Classroom by ID.                |


#### Resource

| Method   | URL                                      | Description                              |
| -------- | ---------------------------------------- | ---------------------------------------- |
| `GET`    | `http://localhost:8080/api/resources`       | Retrieve all Resources.               |
| `POST`   | `http://localhost:8080/api/resources`       | Create a new Resources.               |
| `GET`    | `http://localhost:8080/api/resources/:id`   | Retrieve Resources by ID.             |
| `PATCH`  | `http://localhost:8080/api/resources/:id`   | Update Resources by ID.               |
| `DELETE` | `http://localhost:8080/api/resources/:id`   | Delete Resources by ID.               |


#### Booking

| Method   | URL                                      | Description                              |
| -------- | ---------------------------------------- | ---------------------------------------- |
| `GET`    | `http://localhost:8080/api/bookings`     | Retrieve all Bookings.                   |
| `POST`   | `http://localhost:8080/api/bookings/`    | Create a new Bookings.                   |
| `GET`    | `http://localhost:8080/api/bookings/:id` | Retrieve Bookings by ID.                 |
| `PATCH`  | `http://localhost:8080/api/bookings/:id` | Update Bookings by ID.                   |
| `DELETE` | `http://localhost:8080/api/bookings/:id` | Delete Bookings by ID.                   |


#### Enroollment

| Method   | URL                                      | Description                              |
| -------- | ---------------------------------------- | ---------------------------------------- |
| `GET`    | `http://localhost:8080/api/enrollments/` | Retrieve all Enrollments Only Admin and Faculty have Access.    |
| `POST`   | `http://localhost:8080/api/enrollments/`  | Create a new Enrollment.          |
| `GET`    | `http://localhost:8080/api/enrollments/timetable`| Retrieve timetable for enrolled students.|
| `PATCH`  | `http://localhost:8080/api/enrollments/:id`| Update Enrollment By ID Permisson only for Admin and Faculty.|
| `DELETE` | `http://localhost:8080/api/enrollments/:id`| Delete Enrollment By ID Permisson only for Admin and Faculty.|


#### Notification

| Method   | URL                                      | Description                              |
| -------- | ---------------------------------------- | ---------------------------------------- |
| `GET`    | `http://localhost:8080/api/notifications/`| Retrieve all Notifications accessible only by Admin and Faculty.                    |
| `POST`   | `http://localhost:8080/api/notifications/`  | Create a new Notifications accessible only by Admin and Faculty. |
| `GET`    | `http://localhost:8080/api/notifications/:Userid`| Retrieve Notification By UserID. |
| `PATCH`  | `http://localhost:8080/api/notifications/:id` | Update Notifications accessible only by Admin and Faculty.|
| `DELETE` | `http://localhost:8080/api/notifications/:id` | Delete Notifications accessible only by Admin and Faculty.                   |


## HTTP Response Status Codes

One of the most important things in an API is how it returns response codes. Each response code means a different thing and consumers of your API rely heavily on these codes.

| Code  | Title                     | Description                              |
| ----- | ------------------------- | ---------------------------------------- |
| `200` | `OK`                      | When a request was successfully processed (e.g. when using `GET`, `PATCH`, `PUT` or `DELETE`). |
| `201` | `Created`                 | Every time a record has been added to the database (e.g. when creating a new user or post). |
| `304` | `Not modified`            | When returning a cached response. |
| `400` | `Bad request`             | When the request could not be understood (e.g. invalid syntax). |
| `401` | `Unauthorized`            | When authentication failed. |
| `403` | `Forbidden`               | When an authenticated user is trying to perform an action, which he/she does not have permission to. |
| `404` | `Not found`               | When URL or entity is not found. |
| `440` | `No accept header`        | When the required "Accept" header is missing from the request. |
| `422` | `Unprocessable entity`    | Whenever there is something wrong with the request (e.g. missing parameters, validation errors) even though the syntax is correct (ie. `400` is not warranted). |
| `500` | `Internal server error`   | When an internal error has happened (e.g. when trying to add/update records in the database fails). |
| `502` | `Bad Gateway`             | When a necessary third party service is down. |

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/MhkFIDKy)
