// Import necessary modules
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./db');

// Connect to database
connection();

// Middleware setup
app.use(express.json());
app.use(cors());


// Define the port for the server to listen on
const port = process.env.PORT || 8080;

// Start the server
app.listen(port, () => console.log(`Server listening on port ${port}...`));
