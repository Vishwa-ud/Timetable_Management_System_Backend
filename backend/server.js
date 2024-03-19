// Import necessary modules
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./db');

// Import routes
const UserRoutes = require('./routes/users');
const AuthRoutes = require('./routes/auth');
const coursesRouter = require('./routes/courses');
const timetablesRouter = require('./routes/timetables');
const classroomsRouter = require('./routes/classrooms');
const resourcesRouter = require('./routes/resources');
const bookingsRouter = require('./routes/bookings');
const enrollmentsRouter = require('./routes/enrollments');
const notificationRoutes = require('./routes/notifications');

// Connect to database
connection();

// Middleware setup
app.use(express.json());
app.use(cors());

//Routes
app.use('/api/users', UserRoutes);

app.use('/api/auth', AuthRoutes);

app.use('/api/courses', coursesRouter);

app.use('/api/timetables', timetablesRouter); 

app.use('/api/classrooms', classroomsRouter);

app.use('/api/resources', resourcesRouter);

app.use('/api/bookings', bookingsRouter);

app.use('/api/enrollments', enrollmentsRouter);

app.use('/api/notifications', notificationRoutes);









// Define the port for the server to listen on
const port = process.env.PORT || 8080;

// Start the server
app.listen(port, () => console.log(`Server listening on port ${port}...`));
