const express = require('express');
const { sequelize, authenticateDatabase } = require('./database/database');

const app = express();

// Function to start the server
async function startServer() {
  try {
    // Authenticate database connection
    await authenticateDatabase();

    // Add your middleware and routes here
    // Example:
    // app.use(express.json());
    // app.use('/api/users', require('./routes/users'));

    // Start server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error initializing server:', error);
    process.exit(1); // Exit process if database connection fails
  }
}

// Call startServer function to begin application execution
startServer();
