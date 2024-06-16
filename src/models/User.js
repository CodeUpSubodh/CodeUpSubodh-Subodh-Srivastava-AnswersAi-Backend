const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');

const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'First name is required'
      },
      isString(value) {
        if (typeof value !== 'string') {
          throw new Error('First name must be a string');
        }
      }
    }
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Last name is required'
      },
      isString(value) {
        if (typeof value !== 'string') {
          throw new Error('Last name must be a string');
        }
      }
    }
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Username is required'
      },
      isString(value) {
        if (typeof value !== 'string') {
          throw new Error('Username must be a string');
        }
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Email must be valid'
      }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isLongEnough(value) {
        if (value.length < 8) {
          throw new Error('Password must be at least 8 characters long');
        }
      },
      hasUpperCase(value) {
        if (!/[A-Z]/.test(value)) {
          throw new Error('Password must contain at least one uppercase letter');
        }
      },
      hasSpecialCharacter(value) {
        if (!/[!@#$%^&*]/.test(value)) {
          throw new Error('Password must contain at least one special character');
        }
      },
      hasNumber(value) {
        if (!/\d/.test(value)) {
          throw new Error('Password must contain at least one number');
        }
      }
    }
  }
});

User.sync();

module.exports = User;
