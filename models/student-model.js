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
                        gradeLevel = '${input.gradeLevel}',
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
                        preferredShift = '${input.preferredShift}',
                        preferredCourse = '${input.preferredCourse}'
                    WHERE
                        studentID = ${input.studentID}`;

      connection.query(sql, (error, results) => {
        if (results !== 'undefined') {
          resolve(results);
        } else {
          console.log('Value Undefined', error);
        }
      });
      // console.log('query', sql);
      // resolve(sql);
    }); // end of promise
  },

  getStudent(searchID) {
    return new Promise((resolve, reject) => {
      const sql = `
      SELECT PersonalDataSheet.*, Student.*, Father.*, Mother.*, Education.*, Address.*, Voucher.*, Uniform.*, User.*,
        TIMESTAMPDIFF(YEAR,birthday,CURDATE()) AS age,
        DATE_FORMAT(birthday,'%d/%M/%Y') AS formatedBirthday 
          FROM User
          LEFT OUTER JOIN Student
            ON Student.userID = User.userID
          LEFT OUTER JOIN PersonalDataSheet
            ON Student.personalDataSheetID = PersonalDataSheet.personalDataSheetID
          LEFT OUTER JOIN Father
            ON PersonalDataSheet.personalDataSheetID = Father.personalDataSheetID
          LEFT OUTER JOIN Mother
            ON PersonalDataSheet.personalDataSheetID = Mother.personalDataSheetID
          LEFT OUTER JOIN Address
            ON PersonalDataSheet.personalDataSheetID = Address.personalDataSheetID
          LEFT OUTER JOIN Education
            ON PersonalDataSheet.personalDataSheetID = Education.personalDataSheetID
          LEFT OUTER JOIN Voucher
            ON PersonalDataSheet.personalDataSheetID = Voucher.personalDataSheetID
          LEFT OUTER JOIN Uniform
            ON PersonalDataSheet.personalDataSheetID = Uniform.personalDataSheetID
          WHERE User.userID = ${searchID}
      `;

      connection.query(sql, (error, result) => {
        if (result !== 'undefined') {
          // const sqlValue = result;
          // console.log('getstudent query', result);
          resolve(result);
        } else {
          reject(error);
        }
      });
      // console.log('studenquery', sql);
      // resolve(sql);
    });
  },
};

module.exports = student;
