// Import necessary modules
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./db');

// Import routes
const UserRoutes = require('./routes/users');
const AuthRoutes = require('./routes/auth');

// Connect to database
connection();

// Middleware setup
app.use(express.json());
app.use(cors());

//Routes
app.use('/api/users', UserRoutes);
app.use('/api/auth', AuthRoutes);


// Define the port for the server to listen on
const port = process.env.PORT || 8080;

// Start the server
app.listen(port, () => console.log(`Server listening on port ${port}...`));
