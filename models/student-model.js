const student = {
  // function to check if NaN
  // checkifNaN(value) {
  //   if (isNaN(value)) {
  //     return `"${value}"`;
  //   }
  //   return `${value}`;
  // },

  addStudent(params, pdsID, userID) {
    const sql = `INSERT INTO Student(studentID, personalDataSheetID, userID, firstName, middleName, lastName, strandID, LRN, gradeLevel)
                  VALUES(NULL, ${pdsID}, ${userID}, '${params.firstName}', '${
  params.middleName
}', '${params.lastName}', ${params.stranID}, ${params.LRN}, ${params.gradeLevel})`;

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
