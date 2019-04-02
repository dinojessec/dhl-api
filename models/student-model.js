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

  update(params) {
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
};

module.exports = student;
