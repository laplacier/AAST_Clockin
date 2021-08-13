'use strict';

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  dialect: 'mysql',
  host: process.env.DB_HOST,
  logging: false,
  timezone: '-04:00'
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//
//MySQL Key Associations
//

//Staff
db.staff.hasMany(db.punches);

//Students
db.students.hasMany(db.lunches);

//Punches
db.punches.belongsTo(db.staff);

//Lunches
db.lunches.belongsTo(db.students);

sequelize
  .authenticate()
  .then(() => {
    console.log("MySQL connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to MySQL database", err);
  });

module.exports = db;
