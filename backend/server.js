// Import necessary modules
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./db');
const helmet = require('helmet');

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
//app.use(cors());
app.use(cors({
    origin: 'http://localhost:8080' // Allow requests from localhost:8080
  }));

app.use(helmet()); 

//Routes
app.use('/api/v1/users', UserRoutes);

app.use('/api/v1/auth', AuthRoutes);

app.use('/api/v1/courses', coursesRouter);

app.use('/api/v1/timetables', timetablesRouter); 

app.use('/api/v1/classrooms', classroomsRouter);

app.use('/api/v1/resources', resourcesRouter);

app.use('/api/v1/bookings', bookingsRouter);

app.use('/api/v1/enrollments', enrollmentsRouter);

app.use('/api/v1/notifications', notificationRoutes);









// Define the port for the server to listen on
const port = process.env.PORT || 8080;

// Start the server
app.listen(port, () => console.log(`Server listening on port ${port}...`));

// Export the Express app
module.exports = app;