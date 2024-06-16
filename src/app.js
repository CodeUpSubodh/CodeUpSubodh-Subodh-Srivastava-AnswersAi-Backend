const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const { sequelize } = require('./database/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
// Add more routes as needed

// Start the server
sequelize.sync() // Sync models with the database
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });
