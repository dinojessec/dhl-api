const atob = require('atob');
const Cryptr = require('cryptr');

const cryptr = new Cryptr('secretKey');

exports.generateUserID = user => new Promise((resolve) => {
  const username = user.data.formOne.username;
  const password = user.data.formOne.password;
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
