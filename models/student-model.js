const student = {
  // function to check if NaN
  // checkifNaN(value) {
  //   if (isNaN(value)) {
  //     return `"${value}"`;
  //   }
  //   return `${value}`;
  // },

  addStudent(params, pdsID, userID) {
    const sql = `INSERT INTO Student(studentID, personalDataSheetID, userID, firstName, middleName, lastName, dateRegistered)
                  VALUES(NULL, ${pdsID}, ${userID}, '${params.firstName}', '${
  params.middleName
}', '${params.lastName}', CURDATE());`;

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

  getStudent(searchID) {
    return new Promise((resolve, reject) => {
      const sql = `
      SELECT Student.*, Father.*, Mother.*, Education.*, Address.*, Voucher.*,
        TIMESTAMPDIFF(YEAR,birthday,CURDATE()) AS age,
        DATE_FORMAT(birthday,'%d/%m/%Y') AS formatedBirthday 
          FROM Student
            LEFT JOIN Father
              ON Student.personalDataSheetID = Father.personalDataSheetID
            LEFT JOIN Mother
              ON Student.personalDataSheetID = Mother.personalDataSheetID
            LEFT JOIN Address
              ON Student.personalDataSheetID = Address.personalDataSheetID
            LEFT JOIN Education
              ON Student.personalDataSheetID = Education.personalDataSheetID
            LEFT JOIN Voucher
              ON Student.personalDataSheetID = Voucher.personalDataSheetID
            LEFT JOIN Uniform
              ON Student.personalDataSheetID = Uniform.personalDataSheetID
            where Student.personalDataSheetID = ${searchID}
      `;

      connection.query(sql, (error, result) => {
        if (result !== 'undefined') {
          const sqlValue = result;
          // console.log('getstudent query', result);
          resolve(sqlValue);
        } else {
          reject(error);
        }
      });
      // resolve(sql);
    });
  },
};

module.exports = student;
