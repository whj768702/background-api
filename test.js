const express = require('express');
const mysql = require('mysql');
const mysqlService = require('./api.js');
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
// app.use(multer());

app.get('/name', async function (req, res) {
  const keyword = req.query.keyword;
  if (keyword) {
    const rows = await mysqlService.query(`select * from hero_list where name like '%${keyword}%'`);
    res.send({
      status: true,
      data: rows
    });
  } else {
    const rows = await mysqlService.query(`select * from hero_list`);
    res.send({
      status: true,
      data: rows
    });
  }
});
app.get('/name/:id', async function (req, res) {
  const id = req.params.id;
  if (id) {
    const sql = `select HERO.id,HERO.name,POWER.power
                 from hero_list as HERO left join powers as POWER on HERO.power=POWER.id where HERO.id=${id}`;
    const rows = await mysqlService.query(sql);
    res.send({
      status: true,
      data: rows[0]
    })
  } else {
    res.send({
      msg: '出错了',
      status: false
    })
  }
});

app.put('/update/:id', async function (req, res) {
  const id = parseInt(req.params.id);
  const updatedHero = req.body;
  if (id) {
    const result = await mysqlService.query(`update hero_list set name=? where id=?`, [updatedHero.name, updatedHero.id])
    if (result.affectedRows === 1) {
      res.send({
        msg: '更新成功',
        status: true
      });
    } else {
      res.send({
        msg: '更新失败',
        status: false
      })
    }
  } else {
    res.send({
      msg: '参数错误'
    });
  }
});
app.post('/addHero', async function(req, res) {
  const name = req.body.name;
  if (name) {
    const sql = `insert into hero_list(name) value(?)`;
    const result = await mysqlService.query(sql, name);
    if (result.affectedRows===1) {
      res.send({
        status: true,
        msg: '添加成功',
        data: {id:result.insertId,name:name}
      })
    }
  } else {
    res.send({
      status: false,
      msg: '参数错误'
    });
  }
});
const server = app.listen(8000, "localhost", function () {
  console.log('listening on port %d', server.address().port);
});