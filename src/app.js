const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const { sequelize } = require('./database/database');
const authRoutes = require('./routes/auth');
const questionRoutes = require('./routes/questions');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/questions', questionRoutes);
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
