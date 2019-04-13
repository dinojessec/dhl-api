const student = {
  // function to check if NaN
  // checkifNaN(value) {
  //   if (isNaN(value)) {
  //     return `"${value}"`;
  //   }
  //   return `${value}`;
  // },

  addStudent(params, pdsID, userID) {
    const sql = `INSERT INTO Student(studentID, personalDataSheetID, userID, firstName, middleName, lastName, dateRegistered, status)
                  VALUES(NULL, ${pdsID}, ${userID}, '${params.firstName}', '${
      params.middleName
      }', '${params.lastName}', CURDATE(), 'pending');`;

    return sql;
  },

  updateStudent(params) {
    return new Promise((resolve) => {
      const sql = `UPDATE Student
                    SET 
                        firstName = '${params.firstName}',
                        middleName = '${params.middleName}',
                        lastName = '${params.lastName}',
                        LRN = ${params.LRN},
                        gradeLevel = '${params.gradeLevel}',
                        strandID = ${params.strandID},
                        mobileNumber = ${params.mobileNumber},
                        landlineNumber = ${params.landlineNumber},
                        birthday = '${params.birthday}',
                        gender = '${params.gender}',
                        guardian = '${params.guardian}',
                        religion = '${params.religion}',
                        motherTongue = '${params.motherTongue}',
                        ethnicGroup = '${params.ethnicGroup}',
                        referredBy = '${params.referredBy}',
                        preferredShift = '${params.preferredShift}',
                        preferredCourse = '${params.preferredCourse}'
                    WHERE
                        userID = ${params.userID}`;

      connection.query(sql, (error, results) => {
        if (error) {
          console.log('update student error', error);
        } else {
          resolve(results);
        }
      });
      // resolve(sql);
      console.log(sql);
    }); // end of promise
  },

  getStudent(userID) {
    return new Promise((resolve, reject) => {
      const sql = `
      SELECT PersonalDataSheet.*, Student.*, Father.*, Mother.*, Education.*, Address.*, Voucher.*, Uniform.*, User.*,
        TIMESTAMPDIFF(YEAR,birthday,CURDATE()) AS age,
        DATE_FORMAT(birthday,'%Y/%m/%d') AS formatedBirthday 
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
          WHERE User.userID = ${userID}
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

  updateGradeLevel(params, userID) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE Student SET gradeLevel = '${params.selectedGradeLevel}' WHERE userID = ${
        userID
        }`;

      connection.query(sql, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  getRoleID(userID) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT roleID FROM Student WHERE userID = ${userID}`;

      connection.query(sql, (err, result) => {
        if (err) {
          console.log('get roleID error', err);
        } else {
          resolve(result);
        }
      });
    })
  }
};

module.exports = student;
