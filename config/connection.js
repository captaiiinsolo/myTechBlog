// Imports Sequelize library
const Sequelize = require('sequelize');

// Imports dotenv library
require('dotenv').config();

// Creeates new instance of Sequelize and passes envirnmental variables
const sequelize = process.env.JAWSDB_URL ?
    new Sequelize(process.env.JAWSDB_URL) :
    new Sequelize (
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306,
    }
);

// exports sequelize to be used in other files
module.exports = sequelize;