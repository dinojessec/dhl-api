exports.create = (params, pdsID, userId) => new Promise((resolve) => {
  const sql = `
        INSERT INTO student
        (
            firstName, middleName, lastName,
            lrn, mobileNumber, landlineNumber,
            email, birthday, religion,
            guardian, gender, motherTongue,
            ethnicGroup, status, gradeLevel,
            facebook,  placeOfBirth, instagram,
            personalDataSheetId, userId
        )
        VALUES
        (
            "${params.data.formOne.firstName}", "${params.data.formOne.middleName}", "${
  params.data.formOne.lastName
}",
            ${params.data.formOne.lrn}, ${params.data.formOne.mobileNumber}, ${
  params.data.formOne.landlineNumber
},
            "${params.data.formOne.email}", "${params.data.formOne.birthday}", "${
  params.data.formOne.religion
}",
            "${params.data.formOne.guardian}", "${params.data.formOne.gender}", "${
  params.data.formOne.motherTongue
}",
            "${params.data.formOne.ethnicGroup}", "pending", "${params.data.formOne.facebook}", 
            "${params.data.formOne.gradeLevel}", "${params.data.formOne.placeOfBirth}", "${
  params.data.formOne.instagram
}", ${pdsID}, ${userId}
            )
        `;

  console.log('sql');
  console.log(sql);

  connection.query(sql, (error, results) => {
    if (typeof results !== 'undefined') {
      resolve({
        success: true,
        message: 'student successfully added',
        results,
      });
    }
    resolve({ success: false, message: error });
  });
});
