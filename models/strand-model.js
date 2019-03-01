const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

connection.connect();

exports.getStrandList = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM dhl_db.strand;';
    connection.query(sql, (result) => {
      if (typeof result !== 'undefined') {
        const strandList = result;
        resolve(strandList);
      } else {
        reject(error => console.error(error));
      }
    });
  }).then((val) => { return val; });
};
