const student = {
  // function to check if NaN
  // checkifNaN(value) {
  //   if (isNaN(value)) {
  //     return `"${value}"`;
  //   }
  //   return `${value}`;
  // },
  checkUsername(params) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM User WHERE username = '${params.username}'`;

      connection.query(sql, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result.length);
      });
    });
  },

  addStudent(params, pdsID, userID) {
    const sql = `INSERT INTO Student(studentID, personalDataSheetID, userID, firstName, middleName, lastName, strandID, LRN, gradeLevel, dateRegistered)
                  VALUES(NULL, ${pdsID}, ${userID}, '${params.firstName}', '${
  params.middleName
}', '${params.lastName}', ${params.strandID}, ${params.LRN}, '${
  params.gradeLevel
}', CURDATE());`;

    return sql;
  },

  updateStudent(params) {
    return new Promise((resolve) => {
      const input = params;
      const sql = `UPDATE Student
                    SET 
                        firstName = '${input.firstName}',
                        middleName = '${input.middleName}',
                        lastName = '${input.lastName}',
                        LRN = ${input.LRN},
                        strandID = ${input.strandID},
                        mobileNumber = ${input.mobileNumber},
                        landlineNumber = ${input.landlineNumber},
                        birthday = '${input.birthday}',
                        gender = '${input.gender}',
                        guardian = '${input.guardian}',
                        religion = '${input.religion}',
                        motherTongue = '${input.motherTongue}',
                        ethnicGroup = '${input.ethnicGroup}',
                        referredBy = '${input.referredBy}',
                        preferredShift = '${input.preferredShift}'
                    WHERE
                        personalDataSheetID = ${input.personalDataSheetID}`;

      // connection.query(sql, (error, results) => {
      //   if (typeof results !== 'undefined') {
      //     resolve(results);
      //   } else {
      //     console.log('Value Undefined' error);
      //   }
      // });
      resolve(sql);
    }); // end of promise
  },

  getStudent() {
    const testID = 24;
    return new Promise((resolve, reject) => {
      const sql = `
      SELECT Student.*, Father.*, Mother.*, Education.*, Address.*,
        TIMESTAMPDIFF(YEAR,birthday,CURDATE()) AS age,
        DATE_FORMAT(birthday,'%d/%m/%Y') AS formated 
          FROM Student
            INNER JOIN Father
              ON Student.personalDataSheetID = Father.personalDataSheetID
            INNER JOIN Mother
              ON Student.personalDataSheetID = Mother.personalDataSheetID
            INNER JOIN Address
              ON Student.personalDataSheetID = Address.personalDataSheetID
            INNER JOIN Education
              ON Student.personalDataSheetID = Education.personalDataSheetID
            INNER JOIN Payment
              ON Student.personalDataSheetID = Payment.personalDataSheetID
            INNER JOIN Voucher
              ON Student.personalDataSheetID = Voucher.personalDataSheetID
            INNER JOIN Document
              ON Student.personalDataSheetID = Document.personalDataSheetID
            INNER JOIN Uniform
              ON Student.personalDataSheetID = Uniform.personalDataSheetID
            where Student.personalDataSheetID = ${testID}
      `;

      connection.query(sql, (error, result) => {
        if (result !== 'undefined') {
          const sqlValue = result;
          resolve(sqlValue);
        } else {
          reject(error);
        }
      });
    });
  },
};

module.exports = student;
