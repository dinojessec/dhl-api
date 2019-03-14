const atob = require('atob');
const Cryptr = require('cryptr');

const cryptr = new Cryptr('secretKey');

const user = {
  generateUserID(params) { 
    return new Promise((resolve) => {
      const username = params.username;
      const password = params.password;
      const decryptPassword = atob(password);
      const encryptedPassword = cryptr.encrypt(decryptPassword);

      const sql = `
        INSERT INTO user (username, password) 
        VALUES ("${username}", "${encryptedPassword}")
    `;

      connection.query(sql, (error, results) => {
        if (typeof results !== 'undefined') {
          resolve(results.insertId);
        }
        return null;
      });
    });
  },
};

module.exports = user;
