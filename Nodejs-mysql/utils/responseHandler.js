const getFetch = require('./getFetch');
const Pais = require('../models/pais') 

const responseHandler = async(i) => {
    const respuesta = await getFetch(i)
    
        if(respuesta.status){
            console.error(`No existen paises con el codigo ${i}`)
        }
        if(respuesta.length >= 1){
           respuesta.forEach(async(country) => {
            const existePais = await Pais.findOne({ where: { callingCode: i } })    
            existePais && console.log('El pais ya existe en la tabla')
            if(!existePais){
                const pais = new Pais({
                    callingCode: Number(country.callingCodes[0]),
                    nombre: country.name,
                    capital: country.capital,
                    region: country.region,
                    poblacion: country.population,
                    latitud: country.latlng[0],
                    longitud: country.latlng[1]
                })
                await pais.save()
                
            }
           })
       }
}
module.exports = responseHandler