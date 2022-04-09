const Pais = require('../models/Pais')
const getFetch = require('./getFetch')

const AddCountry = async(callingCode) => {
    
    try{
    const data = await getFetch(callingCode)
   
    if(data){
        const existeCodigo = await Pais.findOne({codigo : callingCode})
        
            if(existeCodigo){
               console.log(`Los paises con el codigo ${callingCode} ya estan cargados en la base de datos`)
            }
            else{
              existeCodigo === null && data.forEach(country => {
                    const newPais = new Pais({
                        codigo: callingCode,
                        nombre: country.name,
                        capital: country.capital,
                        region: country.region,
                        poblacion: country.population,
                        latitud: country.latlng[0],
                        longitud: country.latlng[1]
                    })
                    newPais.save()
                    .then(() => console.log(`${country.name} agregado a la db`))
                    .catch(e => console.error('ERROR AL CARGAR PAIS: ' + e))
                })
            }
        
    }
    else {
        console.log(`No existe pais con el calling code ${callingCode}`)
    }
    }catch(error){
       
        }
}

module.exports = AddCountry