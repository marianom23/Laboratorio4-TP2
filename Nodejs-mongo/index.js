require('./db/connection')
const Pais = require('./models/Pais')

// const AddCountry = require('./utils/AddCountry')
// CARGAR PAISES A LA BASE DE DATOS
// for(let i = 1; i<300; i++){
//     AddCountry(i)
// }

//5.1
const mostrarAmericanos = async() => {
    const americanos = await Pais.find({region : 'Americas'})
    console.log('------------------------------------------')
    console.log('PAISES AMERICANOS')
    americanos.forEach((pais, i) => {
        console.log((i+1) + '- País: ' + pais.nombre + ' - Región: ' + pais.region)
    })
}
//mostrarAmericanos()

//5.2
const mostrarAmericanosConPoblacionAlta = async() => {
    const americanos = await Pais.find({
        region : 'Americas',
        poblacion :  { $gte: 100000000 }
    })
    console.log('------------------------------------------')
    console.log('AMERICANOS CON POBLACION MAYOR A 100.000.000')
    americanos.forEach((pais, i) => {
        console.log((i+1) + '- País: ' + pais.nombre + ' - Región: ' + pais.region + ' - Población: ' + pais.poblacion)
    })
}
//mostrarAmericanosConPoblacionAlta()

//5.3
const mostrarNoAfricanos = async() => {
    const paisesNoAfricanos = await Pais.find({region : {$ne : 'Africa'}})
    console.log('------------------------------------------')
    console.log('PAISES NO AFRICANOS')
    paisesNoAfricanos.forEach((pais, i) => {
        console.log((i+1) + '- País: ' + pais.nombre + ' - Región: ' + pais.region)
    })
}
//mostrarNoAfricanos()

//5.4
const cambiarEgipto = async() => {
    Pais.findOneAndUpdate(
        {nombre : 'Egypt'},
        {nombre: 'Egipto',
         poblacion: 95000000
        })
    .then(console.log('actualizado'))
    .catch(console.error('El pais Egypt no fue encontrado o ya fue actualizado previamente'))
       
    const egipto = await Pais.findOne({nombre : 'Egipto'})
    console.log('País: ' + egipto.nombre + ' - Población: ' + egipto.poblacion)
}
//cambiarEgipto()

//5.5
const delete258 = async() => {
    
    Pais.findOneAndDelete({codigo: 258})
    .then(console.log('El país con el código 258 fue eliminado!'))
    .catch(console.error('El país con el código 258 no fue encontrado o ya fue eliminado previamente'))
}
//delete258()

//5.6
// Al usar drop en una colección la eliminaremos de la db y si es la única
// colección en esa db tambien se eliminara la db y al usarlo en una db directamente
// se eliminara con todas sus colecciones.

//5.7
const mostrarPaisesPorPoblacion = async() => {
    const paises = await Pais.find({
       poblacion :  { $gte: 50000000,
                      $lte: 150000000   
        }
    })
    console.log('------------------------------------------')
    console.log('POBLACIÓN ENTRE 50.000.000 Y 150.000.000')
    paises.forEach((pais, i) => {
        console.log((i+1) + '- País: ' + pais.nombre + ' - Población: ' + pais.poblacion)
    })
}
//mostrarPaisesPorPoblacion()

//5.8
const mostrarPaisesOrdenadosPorNombre = async() => {
    const paises = await Pais.find({}).sort({ nombre: 'asc'});
    console.log('------------------------------------------')
    console.log('PAISES ORDENADOS ALFABETICAMENTE POR NOMBRE')
    paises.forEach((pais, i) => {
        console.log((i+1) + '- País: ' + pais.nombre)
    })
}
//mostrarPaisesOrdenadosPorNombre()

//5.9
const metodoSkip = async() => {
    //al ejecutar el metodo .skip() se salta el primer documento de la colección
    // se le puede pasar un parámetro con el número de documentos que se quiere saltar
    const salto = 130;
    const paises = await Pais.find({}).skip(salto);
    console.log('------------------------------------------')
    console.log(`SALTANDO LOS ${salto} PRIMEROS DOCUMENTOS`)
    paises.forEach(pais => {
        console.log('País: ' + pais.nombre)
    })
}
//metodoSkip()

//5.10
const metodoLikeEnMongo = async() => {
    
    const busqueda = 'Ar';
    const paises = await Pais.find({nombre : {$regex : busqueda}})
    console.log('------------------------------------------')
    console.log(`PAISES QUE INCLUYAN ${busqueda}`)
    paises.forEach(pais => {
        console.log('País: ' + pais.nombre)
    })
}
//metodoLikeEnMongo()

//5.11
/*
Para realizar la copia de seguridad de la base de datos de MongoDB, se utiliza la utilidad mongodump,
que se encuentra en el directorio bin. Esta utilidad realiza la copia de seguridad de todos los datos
en la carpeta «dump» de la ubicación predeterminada /bin/dump. MongoDB utiliza el puerto 27017 de forma 
predeterminada. Se puede utilizar la utilidad mongodump para realizar copias de seguridad en caliente 
(online) o en frío (fuera de línea).
*/ 

