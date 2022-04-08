const {DataTypes} = require('sequelize')
const db = require('../connection')

const Pais = db.define('Pais',{
    callingCode: {
        type: DataTypes.INTEGER
    },
    nombre: {
        type: DataTypes.STRING
    },
    capital: {
        type: DataTypes.STRING
    },
    region: {
        type: DataTypes.STRING
    },
    poblacion: {
        type: DataTypes.BIGINT
    },
    latitud: {
        type: DataTypes.DOUBLE
    },
    longitud: {
        type: DataTypes.DOUBLE
    }
})

module.exports = Pais;

