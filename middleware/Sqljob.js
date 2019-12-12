// get the client
const mysql = require('mysql2');
const Sequelize = require('sequelize');
const News = require('../model/News');
// Option 1: Passing parameters separately
const sequelize = new Sequelize('mining', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });




