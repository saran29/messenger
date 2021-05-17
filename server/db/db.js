const Sequelize = require("sequelize");
// process.env.DATABASE_URL || "postgres://localhost:5432/messenger
const db = new Sequelize("postgres://postgres:test@localhost:5432/messenger", {
  logging: false
});

module.exports = db;
