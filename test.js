const express = require('express');
const mysql = require('mysql');
const mysqlService = require('./api.js');

const app = express();
app.get('/name', async function (req, res) {
  console.log('receive request.');
  const rows = await mysqlService.query('select * from hero_list')
  res.send({
    data: rows
  })
})
const server = app.listen(8000, "localhost", function () {
  console.log('listening on port %d', server.address().port);
});