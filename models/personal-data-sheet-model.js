const mysql = require('mysql')
const connection =  mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });

  connection.connect()

exports.generateID = new Promise((resolve) => {
  const sql = 'INSERT INTO PersonalDataSheet(PersonalDataSheetId) VALUES (NULL)';
  // const sql = 'SELECT * FROM dhl_db.PersonalDataSheet'

  connection.query(sql, (error, results) => {
    if (typeof results !== 'undefined') {
      const personalDataSheetID = results.insertId;
      resolve(personalDataSheetID);
    }
    return null;
  });
}).then(val => {return val})

