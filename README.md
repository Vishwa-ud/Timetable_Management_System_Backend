# University Timetable Management System
---

 RESTful API for managing a university's timetable system Backend

 Table of contents
=================

<!--ts-->
   * [Functional Requirements](#functional-requirements)
     * [User Roles and Authentication](#user-roles-and-authentication)
     * [Course Management](#course-management)
     * [Timetable Management](#timetable-management)
     * [Room and Resource Booking](#room-and-resource-booking)
     * [Student Enrollment](#student-enrollment)
     * [Notifications and Alerts](#notifications-and-alerts)
   * [Non-Functional Requirements](#non-functional-requirements)
   * [Testing](#testing)
      * [Unit Testing](#unit-testing)
      * [Integration Testing ](#integration-testing)
      * [Security Testing](#security-testing)
      * [Performance Testing](#performance-testing)
    
        
<!--te-->

# Installation

To run this project locally, follow these steps:

1. Create a New Folder Open it

2. Press Alt + D to select the address bar.

3. Type cmd and press Enter. This will open a command prompt window with the current folder as its location. (this method will open a command prompt window with the directory set to the folder you specified, allowing you to run commands directly in that folder)

4. Clone the repository to your local machine using Git:

```bash
git clone github_repo_link
```
5. Navigate to the project directory 
  ```
  cd backend
  ```
6. Install the project dependencies using npm.
```
npm i
```
7. run
```
npm start
```

---
# Tech Stack
- Node.js
- Express.js
- MongoDb
- JavaScript

# Aditional Dependencies

- jsonwebtoken for session management.
- bcrypt for  Hashing passwords.
- Winston Logger for Log critical information for audit and diagnostic purposes.
- Jest for Unit Testing.
- OWASP ZAP proxy security for testing
- Postman API end point check and integration testing
- artillery.io for performance testing.

# Functional Requirements

1. User Roles and Authentication:
- Define multiple user roles (e.g., Admin, Faculty, Student) with different access levels.
- Implement secure login functionality and session management using JWT.

2. Course Management:
- Allow CRUD operations on courses, including course name, code, description, and credits.
- Enable Admins to assign Faculty to courses.
3. Timetable Management:
- Facilitate the creation and modification of weekly timetables for different courses.
- Include functionality to add, update, and delete class sessions, specifying the course, time, faculty, and location.

4. Room and Resource Booking:
- Manage classrooms and resources (e.g., projectors, labs) availability.
- Allow booking of rooms and resources for classes or events, ensuring no overlaps.

5. Student Enrollment:
- Enable students to enroll in courses and view their timetables.
- Allow Faculty and Admins to view and manage student enrollments in courses.

6. Notifications and Alerts:
- Implement a system to notify users of timetable changes, room changes, or important announcements.

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
| `POST`   | `http://localhost:8080/api/v1/users/`        | Create a new User Registration.         |

example:

#### User Login

| Method   | URL                                      | Description                              |
| -------- | ---------------------------------------- | ---------------------------------------- |
| `POST`   | `http://localhost:8080/api/v1/auth/`        |  User Login.                             |

example:

#### Role Access

| Method   | URL                                      | Description                              |
| -------- | ---------------------------------------- | ---------------------------------------- |
| `GET`    | `http://localhost:8080/api/v1/users/admin/dashboard`    | Access Granted Admin Dashbord   |
| `GET`    | `http://localhost:8080/api/v1/users/faculty/dashboard`  | Access Granted Faculty Dashbord |
| `GET`    | `http://localhost:8080/api/v1/users/student/dashboard`  | Access Granted Student Dashbord |

example:

The authorized user’s token. This is used to gain access to protected endpoint.

| Header key        | Value                                    | Value                                   |
| ----------------- | ---------------------------------------- |---------------------------------------- |
| `Authorization`   | Bearer Token                             | After a Successful loging Generates a token with limited expire time use that as the token.|

## Course Management

#### Course

| Method   | URL                                      | Description                              |
| -------- | ---------------------------------------- | ---------------------------------------- |
| `GET`    | `http://localhost:8080/api/v1/courses/`     | Retrieve all course.                     |
| `POST`   | `http://localhost:8080/api/v1/courses/`     | Create a new User Registration.          |
| `POST`   | `http://localhost:8080/api/v1/courses/:id/assign-faculty`| Assign Faculty to Course.   |
| `GET`    | `http://localhost:8080/api/v1/courses/:id`  | Retrieve course by ID.                   |
| `PATCH`  | `http://localhost:8080/api/v1/courses/:id`  | Update course by ID.                     |
| `DELETE` | `http://localhost:8080/api/v1/courses/:id`  | Delete course by ID.                     |


## Timetable Management

#### Timetables

| Method   | URL                                      | Description                              |
| -------- | ---------------------------------------- | ---------------------------------------- |
| `GET`    | `http://localhost:8080/api/v1/timetables/`    | Retrieve all Timetables.                 |
| `POST`   | `http://localhost:8080/api/v1/timetables/`    | Create a new Timetable.                  |
| `GET`    | `http://localhost:8080/api/v1/timetables/:id` | Retrieve Timetable by ID.                |
| `PATCH`  | `http://localhost:8080/api/v1/timetables/:id` | Update Timetable by ID.                  |
| `DELETE` | `http://localhost:8080/api/v1/timetables/:id` | Delete Timetable by ID.                  |


## Room and Resource Booking

#### Classroom

| Method   | URL                                      | Description                              |
| -------- | ---------------------------------------- | ---------------------------------------- |
| `GET`    | `http://localhost:8080/api/v1/classrooms/`    | Retrieve all Classrooms.               |
| `POST`   | `http://localhost:8080/api/v1/classrooms/`    | Create a new Classroom.                |
| `GET`    | `http://localhost:8080/api/v1/classrooms/:id` | Retrieve Classroom by ID.              |
| `PATCH`  | `http://localhost:8080/api/v1/classrooms/:id` | Update Classroom by ID.                |
| `DELETE` | `http://localhost:8080/api/v1/classrooms/:id` | Delete Classroom by ID.                |


#### Resource

| Method   | URL                                      | Description                              |
| -------- | ---------------------------------------- | ---------------------------------------- |
| `GET`    | `http://localhost:8080/api/v1/resources`       | Retrieve all Resources.               |
| `POST`   | `http://localhost:8080/api/v1/resources`       | Create a new Resources.               |
| `GET`    | `http://localhost:8080/api/v1/resources/:id`   | Retrieve Resources by ID.             |
| `PATCH`  | `http://localhost:8080/api/v1/resources/:id`   | Update Resources by ID.               |
| `DELETE` | `http://localhost:8080/api/v1/resources/:id`   | Delete Resources by ID.               |


#### Booking

| Method   | URL                                      | Description                              |
| -------- | ---------------------------------------- | ---------------------------------------- |
| `GET`    | `http://localhost:8080/api/v1/bookings`     | Retrieve all Bookings.                   |
| `POST`   | `http://localhost:8080/api/v1/bookings/`    | Create a new Bookings.                   |
| `GET`    | `http://localhost:8080/api/v1/bookings/:id` | Retrieve Bookings by ID.                 |
| `PATCH`  | `http://localhost:8080/api/v1/bookings/:id` | Update Bookings by ID.                   |
| `DELETE` | `http://localhost:8080/api/v1/bookings/:id` | Delete Bookings by ID.                   |

## Student Enrollment

#### Enroollment

| Method   | URL                                      | Description                              |
| -------- | ---------------------------------------- | ---------------------------------------- |
| `GET`    | `http://localhost:8080/api/v1/enrollments/` | Retrieve all Enrollments Only Admin and Faculty have Access.    |
| `POST`   | `http://localhost:8080/api/v1/enrollments/`  | Create a new Enrollment.          |
| `GET`    | `http://localhost:8080/api/v1/enrollments/timetable`| Retrieve timetable for enrolled students.|
| `PATCH`  | `http://localhost:8080/api/v1/enrollments/:id`| Update Enrollment By ID Permisson only for Admin and Faculty.|
| `DELETE` | `http://localhost:8080/api/v1/enrollments/:id`| Delete Enrollment By ID Permisson only for Admin and Faculty.|

# Notifications and Alerts

#### Notification

| Method   | URL                                      | Description                              |
| -------- | ---------------------------------------- | ---------------------------------------- |
| `GET`    | `http://localhost:8080/api/v1/notifications/`| Retrieve all Notifications accessible only by Admin and Faculty.                    |
| `POST`   | `http://localhost:8080/api/v1/notifications/`  | Create a new Notifications accessible only by Admin and Faculty. |
| `GET`    | `http://localhost:8080/api/v1/notifications/:Userid`| Retrieve Notification By UserID. |
| `PATCH`  | `http://localhost:8080/api/v1/notifications/:id` | Update Notifications accessible only by Admin and Faculty.|
| `DELETE` | `http://localhost:8080/api/v1/notifications/:id` | Delete Notifications accessible only by Admin and Faculty.                   |


### HTTP Response Status Codes

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

---
## Non-Functional Requirements

1. Security
   - hashing passwords using bcrypt
   - When store passwords in a database, it's important to store them securely to prevent unauthorized access. Simply storing passwords in plain text is a significant security risk because if the database is compromised, all passwords would be exposed.
   -  using bcrypt to hash it along with a random salt, and storing the resulting hash and salt securely in a database.
     
![pwd hasing](https://github.com/sliitcsse/assignment-01-Vishwa-ud/assets/94515855/0509b0a8-e601-4e16-9c95-552351816133)

2. Database Design.

![Db](https://github.com/sliitcsse/assignment-01-Vishwa-ud/assets/94515855/874d4863-0c40-4f42-b556-92358c91f4f9)

3. Code Quality and Documentation.
4. Error Handling and Logging Used Winston logger to Log critical information for audit and diagnostic purposes.

---
## Testing

### Unit Testing

Implement unit tests for individual components and functions to validate their 
behavior in isolation.

* updated .env for New Database for testing perpose. 
```
DB =mongodb+srv://vishwaud:VishUd@clusterx.tvrnmmh.mongodb.net/unittest?retryWrites=true&w=majority&appName=ClusterX
```
* Setting up Jest for unit testing
* Install Dependencies.
  ```
  npm install jest supertest --save-dev
  npm i jest supertest cross-env
  ```
* Update Package.JSON.
  ```
  "scripts": {
    "test": "cross-env NODE_ENV=test jest --testTimeout=5000",
    "start": "nodemon server.js"
  },
  ```
* Create a Folder Name test. then create a file there called example.test.js.
* Then Write Unit Test Cases.
* Run Test cases
  ```
  npm test filename.test.js
  ```

Comprehensive unit tests covering all components.

Register User

![User](https://github.com/sliitcsse/assignment-01-Vishwa-ud/assets/94515855/92cbd9e9-4b69-4903-871b-4df24e91f1f3)

Login User

![AuthPNG](https://github.com/sliitcsse/assignment-01-Vishwa-ud/assets/94515855/c73c6071-1208-4297-9e9e-22b77f44790d)

Course

![Course](https://github.com/sliitcsse/assignment-01-Vishwa-ud/assets/94515855/dfffdb6a-63ef-4f76-ba09-a67e093050cc)

Timetable

![Timetable](https://github.com/sliitcsse/assignment-01-Vishwa-ud/assets/94515855/30d86fc0-e0e0-4aa4-9306-38e6ffb82d3e)

Classroom

![Classroom](https://github.com/sliitcsse/assignment-01-Vishwa-ud/assets/94515855/3d8b8326-d2c0-47cf-a9a1-134cb2e22552)

Resource

![Res](https://github.com/sliitcsse/assignment-01-Vishwa-ud/assets/94515855/5869bc21-8ce1-4ccb-8e62-450e254e0dd4)

Bookings

![Booking](https://github.com/sliitcsse/assignment-01-Vishwa-ud/assets/94515855/7c1e7a28-7e7d-4480-9991-36a5b2a0dc37)

Enrollments

![Enrollment](https://github.com/sliitcsse/assignment-01-Vishwa-ud/assets/94515855/9548307a-3079-4f59-b4c3-33690d215451)

Notifications

![Notification](https://github.com/sliitcsse/assignment-01-Vishwa-ud/assets/94515855/7b78850e-5be2-4bd3-82eb-c0f0e140cde3)

---

### Integration Testing

Integration testing with Postman involves sending HTTP requests to API endpoints and verifying that the responses match the expected behavior.

* Install Postman
* Create a new Collection
* Add Requests to the Collection
    - Choose the HTTP method (GET, POST, PUT, DELETE, etc.) that corresponds to the endpoint you want to test.
* Define Tests in Test section Write Test Script
* Send Request

Integration Test using Postman [Link](https://pages.github.com/).
---
### Security Testing

* OWASP Zap

1. Start OWASP ZAP on your system.
2. Configure ZAP Proxy:
  - Navigate to the "Tools" menu and select "Options."
  - Under the "Local Proxy" section, note the IP address and port number where ZAP is listening for proxy requests set localhost 8081.
3. Configure Postman file Settings (ctrl + comma) Proxy use coustom proxy configaration localhost 8081.
4. Explore APIs Send request from postman.
  - Access the APIs you want to test using postman.
5. Spider the APIs
  - In ZAP, go to the "Spider" tab.
  - Enter the base URL of the APIs and click "Start Scan.".
6. Active Scan:
  - After spidering is complete, go to the "Active Scan" tab.
  - Click on "Start Scan" to begin the active scanning process.
7. Review Scan Results:
  - Once the scan is complete, navigate to the "Alerts" tab.
8. Generate Reports:
  - ZAP allows you to generate reports summarizing the findings of your security testing.
  - Go to the "Report" tab.

![Security](https://github.com/sliitcsse/assignment-01-Vishwa-ud/assets/94515855/4015dc89-b096-42ef-a8e5-9c32ebb17098)


---
### Performance Testing
* Install Atrillert.io

```
npm install -g artillery
```
* sample test:
```
config:
  target: http://localhost:8080
  phases:
    - duration: 20
      arrivalRate: 5
      name: Startup phase
scenarios:
  - flow:
    - get:
        url: "/api/v1/courses"
```
* example: run performance test
```
npx artillery run performance/demo_api_load.yml
```
* Generate report 
```
npx artillery run performance/demo_api_load.yml --output performance/report.json

```
* HTML Format
```
npx artillery report performance/report.json --output performance/report.html

```
![Pref1](https://github.com/sliitcsse/assignment-01-Vishwa-ud/assets/94515855/3bb3d112-44e8-4850-b163-4e437a22ff7d)

---

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/MhkFIDKy)
