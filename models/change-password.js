const atob = require('atob');
const Cryptr = require('cryptr');

const cryptr = new Cryptr('secretKey');

const password = {
  changePassword(params) {
    const decryptPassword = atob(params.password);
    const encryptedPassword = cryptr.encrypt(decryptPassword);
    
    return new Promise((resolve, reject) => {
      const sql = `UPDATE User SET password = ${encryptedPassword} WHERE userID = ${params.user}`;

      console.log(sql);
      connection.query(sql, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          resolve(result);
        }
      });
    });
  },
};

module.exports = password;
