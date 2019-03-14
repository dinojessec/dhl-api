const db = require('../routes/connection');

exports.getStrandList = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM dhl_db.strand;';
    db.connection.query(sql, (result) => {
      if (typeof result !== 'undefined') {
        const strandList = result;
        resolve(strandList);
      } else {
        reject(error => console.log(error));
      }
    });
  }).then((val) => { return val; });
};
