const db = require('./connection.js')
const responseHandler = require('./utils/responseHandler')

db.authenticate()
.then(console.log('Database Connected'))
.catch(e => console.error('ERROR: ' + e))

for (let i = 1; i < 300; i++){
    responseHandler(i)
  }
  
  
