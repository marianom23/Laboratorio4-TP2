const mongoose = require('mongoose')
const {Schema, model} = mongoose

const PaisSchema = new Schema({
    codigo: Number,
    nombre: String,
    capital: String,
    region: String,
    poblacion: Number,
    latitud: Number,
    longitud: Number
})

const Pais = model('Pais', PaisSchema)

module.exports = Pais;