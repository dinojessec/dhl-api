const atob = require('atob');
const Cryptr = require('cryptr');

const cryptr = new Cryptr('secretKey');

const user = {
  generateUserID(params) {
    const userName = params.username;
    const passWord = params.password;
    const decryptPassword = atob(passWord);
    const encryptedPassword = cryptr.encrypt(decryptPassword);

    const sql = `
          INSERT INTO User (userID, username, password)
          VALUES (NULL, "${userName}", "${encryptedPassword}");
      `;

    return sql;
  },
};

module.exports = user;
