const student = {
  // function to check if NaN
  // checkifNaN(value) {
  //   if (isNaN(value)) {
  //     return `"${value}"`;
  //   }
  //   return `${value}`;
  // },

  addStudent(params, pdsID, userID) {
    const sql = `INSERT INTO Student(studentID, personalDataSheetID, userID, roleID, firstName, middleName, lastName, dateRegistered, status)
                  VALUES(NULL, ${pdsID}, ${userID}, 1, '${params.firstName}', '${
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
                        email = '${params.email}',
                        mobileNumber = ${params.mobileNumber},
                        landlineNumber = ${params.landlineNumber},
                        birthday = '${params.birthday}',
                        gender = '${params.gender}',
                        religion = '${params.religion}',
                        motherTongue = '${params.motherTongue}',
                        ethnicGroup = '${params.ethnicGroup}',
                        referredBy = '${params.referredBy}',
                        preferredShift = '${params.preferredShift}',
                        preferredCourse = '${params.preferredCourse}',
                        jhs_average = ${params.jhs_average},
                        schoolType = '${params.schoolType}'
                    WHERE
                        userID = ${params.userID}`;

      connection.query(sql, (error, results) => {
        if (error) {
          console.log('update student error', error);
        } else {
          resolve(results);
        }
      });
    }); // end of promise
  },

  getStudent(userID) {
    return new Promise((resolve, reject) => {
      const sql = `
      SELECT PersonalDataSheet.*, Student.*, Father.*, Mother.*, Guardian.*, Education.*, Address.*, Voucher.*, Uniform.*, User.*,
        TIMESTAMPDIFF(YEAR,birthday,CURDATE()) AS Age,
        DATE_FORMAT(birthday,'%Y/%m/%d') AS birthday,
        DATE_FORMAT(jhsYear,'%Y/%m/%d') AS jhsYear,
        DATE_FORMAT(elemYear,'%Y/%m/%d') AS elemYear
          FROM User
          LEFT OUTER JOIN Student
            ON Student.userID = User.userID
          LEFT OUTER JOIN PersonalDataSheet
            ON Student.personalDataSheetID = PersonalDataSheet.personalDataSheetID
          LEFT OUTER JOIN Father
            ON PersonalDataSheet.personalDataSheetID = Father.personalDataSheetID
          LEFT OUTER JOIN Mother
            ON PersonalDataSheet.personalDataSheetID = Mother.personalDataSheetID
          LEFT OUTER JOIN Guardian
            ON PersonalDataSheet.personalDataSheetID = Guardian.personalDataSheetID
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
  },

  getAllStudent() {
    return new Promise(resolve => {
      const sql = `SELECT *,
                    CONCAT('/profile/', userID) AS path,
                    CONCAT('/admin/checkout/', userID) AS checkout,
                    CONCAT(firstName, ' ', middleName, ' ', lastName) AS Fullname,
                    TIMESTAMPDIFF(YEAR,birthday,CURDATE()) AS Age,
                    DATE_FORMAT(jhsYear,'%Y-%M-%d') AS formattedJhsYear
                      FROM Student
                        LEFT JOIN Education
                          ON Student.personalDataSheetID = Education.personalDataSheetID
                        LEFT JOIN Strand 
                          ON Student.strandID = Strand.strandID 
                        WHERE roleID = 1`;

      connection.query(sql, (err, result) => {
        if (err) {
          console.log(`get student error ${err}`);
        } else {
          resolve(result);
        }
      });
    })
  },

  approveStudent(username, studentUserID) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE Student SET approvedBy = '${username}', status = 'approved' WHERE userID = ${studentUserID}`;

      connection.query(sql, (err, result) => {
        if (err) {
          console.log('approve student error', err);
        } else {
          resolve(result);
        }
      });
    })
  },

  getStudentCheckout(userID) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT *, DATE_FORMAT(dateRegistered,'%M/%d/%Y') AS checkoutDate FROM Student LEFT JOIN Strand ON Student.strandID = Strand.strandID WHERE Student.userID = 1
      `
      connection.query(sql, (err, result) => {
        if (err) {
          console.log(`error on get student checkout ${err}`);
        } else {
          resolve(result)
        }
      });
    })
  },

  getPdsID(userID) {
    return new Promise((resolve) => {
      const sql = `SELECT personalDataSheetID FROM Student WHERE userID = ${userID}`;

      connection.query(sql, (err, result) => {
        if (err) {
          console.log(`error getting pdsID ${err}`);
        } else {
          resolve(result);
        }
      })
    })
  },

  getStudentGradeLevel(grade) {
    return new Promise((resolve) => {
      const sql = `SELECT *,
      CONCAT('/profile/', userID) AS path,
      CONCAT('/admin/checkout/', userID) AS checkout,
      CONCAT(firstName, ' ', middleName, ' ', lastName) AS Fullname,
      TIMESTAMPDIFF(YEAR,birthday,CURDATE()) AS Age,
      DATE_FORMAT(jhsYear,'%Y-%M-%d') AS formattedJhsYear
                    FROM Student 
                      LEFT JOIN Strand
                        ON Student.strandID = Strand.strandID
                      LEFT JOIN Education
                        ON Student.personalDataSheetID = Education.personalDataSheetID
                    WHERE Student.roleID = 1 AND Student.gradeLevel = '${grade}'`;
      connection.query(sql, (err, result) => {
        if (err) {
          console.log('getstudent grade error', err);
        } else {
          resolve(result);
        }
      });
    })
  },

  getStudentByAge() {
    return new Promise(resolve => {
      const sql = `SELECT *,
      CONCAT('/profile/', userID) AS path,
                    CONCAT('/admin/checkout/', userID) AS checkout,
                    CONCAT(firstName, ' ', middleName, ' ', lastName) AS Fullname,
                    TIMESTAMPDIFF(YEAR,birthday,CURDATE()) AS Age,
                    DATE_FORMAT(jhsYear,'%Y-%M-%d') AS formattedJhsYear
                        FROM Student
                        LEFT JOIN Strand
                        ON Student.strandID = Strand.strandID
                      LEFT JOIN Education
                        ON Student.personalDataSheetID = Education.personalDataSheetID
                        WHERE Student.roleID = 1 
                        ORDER BY age ASC`;

      connection.query(sql, (err, result) => {
        if (err) {
          console.log('error getting student by age', err);
        } else {
          resolve(result);
        }
      })
    })
  },

  getStudentByGender(gender) {
    return new Promise(resolve => {
      const sql = `SELECT *,
      CONCAT('/profile/', userID) AS path,
      CONCAT('/admin/checkout/', userID) AS checkout,
      CONCAT(firstName, ' ', middleName, ' ', lastName) AS Fullname,
      TIMESTAMPDIFF(YEAR,birthday,CURDATE()) AS Age,
      DATE_FORMAT(jhsYear,'%Y-%M-%d') AS formattedJhsYear
                    FROM Student 
                      LEFT JOIN Strand
                        ON Student.strandID = Strand.strandID
                      LEFT JOIN Education
                        ON Student.personalDataSheetID = Education.personalDataSheetID
                    WHERE Student.roleID = 1 AND Student.gender = '${gender}'`;

      connection.query(sql, (err, result) => {
        if (err) {
          console.log('error getting student by gender', err);
        } else {
          resolve(result);
        }
      })
    })
  }

};

module.exports = student;
