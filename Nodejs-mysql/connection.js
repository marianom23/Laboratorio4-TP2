const {Sequelize} = require('sequelize')



const db = new Sequelize('laboratorio_4', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})



module.exports = db