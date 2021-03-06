const atob = require('atob');
const btoa = require('btoa');
const Cryptr = require('cryptr');

const cryptr = new Cryptr('secretKey');

const user = {
  generateUserID(params) {
    const userName = params.username;
    const passWord = params.password;
    const decryptPassword = btoa(passWord);
    const encryptedPassword = cryptr.encrypt(decryptPassword);

    const sql = `
          INSERT INTO User (userID, username, password)
          VALUES (NULL, "${userName}", "${encryptedPassword}");
      `;

    return sql;
  },

  checkUsername(params) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM User WHERE username = '${params.username}'`;

      connection.query(sql, (err, result) => {
        if (result === null || result === 'undefined') {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  getStudentInfo(userID) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM Student WHERE userID = ${userID}`;

      connection.query(sql, (err, result) => {
        if (err) {
          reject(err);
          console.log('error on getPDSID', err);
        } else {
          resolve(result);
        }
      });
    });
  },

  comparePassword(userInputPass, dbPassword) {
    return new Promise((resolve, reject) => {
      const decryptPass = cryptr.decrypt(dbPassword);
      const atobPass = btoa(decryptPass);
      const sql = `SELECT STRCMP('${userInputPass}', '${atobPass}')`;

      // connection.query(sql, (err, result) => {
      //   if (err) {
      //     reject(err);
      //   } else {
      //     resolve(result);
      //   }
      // });
      resole(sql);
    });
  },

  getApprover(userID) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT username FROM User WHERE userID = ${userID}`

      connection.query(sql, (err, result) => {
        if (err) {
          console.log('get approver error', err);
        } else {
          resolve(result);
        }
      });
    })
  }
};

module.exports = user;
