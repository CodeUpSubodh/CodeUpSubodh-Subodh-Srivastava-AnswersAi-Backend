const { Sequelize } = require('sequelize');

// Initialize Sequelize with database connection details
const sequelize = new Sequelize({
  dialect: 'postgres',               // Specify the dialect of your database
  host: process.env.DATABASE_HOST,   // Use environment variable for the host
  port: process.env.DATABASE_PORT,   // Use environment variable for the port
  username: process.env.DATABASE_USER, // Use environment variable for the username
  password: process.env.DATABASE_PASSWORD,  // Use environment variable for the password
  database: process.env.DATABASE_NAME, // Use environment variable for the database name
});

// Function to authenticate and test the database connection
async function authenticateDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error; // Re-throw error to handle it elsewhere if needed
  }
}

// Export sequelize instance and authenticate function
module.exports = {
  sequelize,
  authenticateDatabase,
};
