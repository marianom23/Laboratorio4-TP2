const mongoose = require('mongoose')

const connectionString = 'mongodb://localhost:27017/db_tp2_lab4'

mongoose.connect(connectionString)
.then(() => console.log('database connected'))
.catch(e => console.error('ERROR AL CONECTAR DB: ' + e))