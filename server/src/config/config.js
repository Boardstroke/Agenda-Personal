const path = require('path')
module.exports = {
  port: '8081',
  db:{
    name: 'agenda-personal',
    user: 'admin',
    password: 'admin',
    options:{
      dialect: 'sqlite',
      host: 'localhost',
      storage: path.join(__dirname, '../../agenda.sqlite')
    }
  }
}