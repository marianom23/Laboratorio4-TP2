const {Sequelize} = require('sequelize')



const db = new Sequelize('tp2-lab4', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})



module.exports = db