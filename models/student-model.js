const atob = require('atob');
const Cryptr = require('cryptr');

const cryptr = new Cryptr('secretKey');

const student = {
  // function to check if NaN
  checkifNaN(value) {
    if (isNaN(value)) {
      return `"${value}"`;
    }
    return `${value}`;
  },

  add(params) {
    return new Promise((resolve) => {
      const input = params;
      const decryptPassword = atob(input.password);
      const encryptedPassword = cryptr.encrypt(decryptPassword);

      // const studentInput = {

      // };

      const queryPdsID = 'INSERT INTO PersonalDataSheet(PersonalDataSheetId) VALUES (NULL);';
      const queryUserID = `INSERT INTO user (userId, username, password) 
      VALUES (NULL, "${input.username}", "${encryptedPassword}");`;

      connection.beginTransaction((err) => {
        if (err) {
          throw err;
        } else {
          // get pdsID query
          connection.query(queryPdsID, (error, result) => {
            if (error) {
              throw error;
            } else {
              const pdsID = result.insertId;
              // get userID query
              connection.query(queryUserID, (errors, result) => {
                if (error) {
                  console.log('error in query', errors);
                } else {
                  const userID = result.insertId;
                  // add pdsID and userID on the checking if NaN
                  input.personalDataSheetId = pdsID;
                  input.userId = userID;
                  // remove username and password from the checking
                  delete input.password;
                  delete input.username;

                  let sql = 'INSERT INTO student (status,';

                  // columns
                  const keys = Object.keys(input);
                  const end = keys.length - 1;
                  for (let i = 0; i <= end; i++) {
                    const key = keys[i];
                    if (key !== '') {
                      if (i === end) {
                        sql += `${key}`;
                      } else {
                        sql += `${key},`;
                      }
                    }
                  }

                  sql += ') VALUES ("pending",';
                  // values
                  const values = Object.values(input);
                  const lastVal = values.length - 1;

                  for (let i = 0; i <= lastVal; i++) {
                    const val = values[i];
                    if (val !== '') {
                      if (student.checkifNaN(val)) {
                        const newVal = student.checkifNaN(val);
                        if (i === lastVal) {
                          sql += `${newVal}`;
                        } else {
                          sql += `${newVal},`;
                        }
                      }
                    }
                  }

                  sql += ')';
                  console.log(sql);
                  console.log(pdsID);
                  console.log(userID);
                  console.log(input);
                  connection.query(sql, (err, result) => {
                    if (err) {
                      connection.rollback();
                    } else {
                      connection.commit();
                      resolve(result.insertId);
                    }
                  });
                }
              });
            }
            // QUERY
          });
        }
        // TRANSACTION
      });
      // return resolve(true);
    });
  },

  update(params) {
    return new Promise((resolve) => {
      let sql = 'INSERT INTO student(';

      const keys = Object.keys(params);
      const end = keys.length - 1;
      for (let i = 0; i <= end; i++) {
        const key = keys[i];
        if (key !== '') {
          if (i === end) {
            sql += `${key}`;
          } else {
            sql += `${key},`;
          }
        }
      }

      sql += ') VAlUES(';

      const values = Object.values(params);
      const lastVal = values.length - 1;
      for (let i = 0; i <= lastVal; i++) {
        const val = values[i];
        if (val !== '') {
          if (student.checkifNaN(val)) {
            const newVal = student.checkifNaN(val);
            if (i === lastVal) {
              sql += `${newVal}`;
            } else {
              sql += `${newVal},`;
            }
          }
        }
      }

      sql += ')';
      // console.log(sql);
      resolve(sql);
    }); // end of promise
  },
};

module.exports = student;
