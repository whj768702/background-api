const mysql = require('mysql');
const mysqlService = {};
const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root1234',
  database: 'Angular',
  insecureAuth: true
});
const query = function (sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
          connection.release();
        });
      }
    })
  })
}
// let update = function (sql, values) {
//   return new Promise((resolve, reject) => {
//     pool.getConnection(function (err, connection) {
//       if (err) {
//         reject(err);
//       } else {
//         connection.update()
//       }
//     });
//   });
// }
mysqlService.query = query;
module.exports = mysqlService;
