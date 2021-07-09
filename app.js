const express = require('express')
const app = express()
 
app.get('/', function (req, res) {
  res.send('ccc World')
})
 
app.listen(3000)