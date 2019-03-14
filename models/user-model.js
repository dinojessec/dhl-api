const atob = require('atob');
const Cryptr = require('cryptr');

const cryptr = new Cryptr('secretKey');

const user = {
  generateUserID(params) {
    return new Promise((resolve) => {
      const userName = params.username;
      const passWord = params.password;
      const decryptPassword = atob(passWord);
      const encryptedPassword = cryptr.encrypt(decryptPassword);

      const sql = `
        INSERT INTO user (userId, username, password)
        VALUES (NULL, "${userName}", "${encryptedPassword}")
    `;

      connection.query(sql, (error, results) => {
        if (typeof results !== 'undefined') {
          const userId = results.insertId;
          resolve(userId);
        }
        return null;
      });
    // resolve(params);
    });
  },
};

module.exports = user;
