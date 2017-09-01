const Sequelize = require('sequelize')

const sequelize = new Sequelize('security_trend','username','password',{
    host:'localhost',
    dialect:'mysql',
    pool:{
        max:5,
        min:0,
        idle:10000
    }
});

module.exports = sequelize