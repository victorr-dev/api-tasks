const moment = require('moment')

const getDate = () =>{
  return moment().format('DD-MM-YYYY');
}

module.exports = {
  getDate
}
