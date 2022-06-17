'use strict';

const Sequelize = require('sequelize');
const psqlCon = require('../connectors/psql');

const User = psqlCon.sequelize.define('users', {
  // attributes
  id: { type: Sequelize.STRING, primaryKey: true },
  email: { type: Sequelize.STRING },
  password: { type: Sequelize.STRING },
  first_name: { type: Sequelize.STRING },
  last_name: { type: Sequelize.STRING },
  avatar_url: { type: Sequelize.STRING },
  email_verification_token: { type: Sequelize.STRING },
  email_verified_at: { type: Sequelize.DATE },
  forgot_password_token: { type: Sequelize.STRING },

  created_at: { type: Sequelize.DATE },
  updated_at: { type: Sequelize.DATE },
}, {
  freezeTableName: true,
  tableName: 'users',
  createdAt: false,
  updatedAt: false,
});

module.exports = {
  User,
};

