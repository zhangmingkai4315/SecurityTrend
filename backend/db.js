const Sequelize = require('sequelize')
const config = require('./config');
const sequelize = new Sequelize(config['database'], config['username'], config['password'],{
    host: config['hostname'],
    dialect: config['dialect'],
    pool:{
        max:5,
        min:0,
        idle:10000
    }
});

module.exports = sequelize