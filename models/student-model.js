// exports.create = (params, pdsID, userId) => new Promise((resolve) => {
// exports.create = (params, pdsID) => new Promise((resolve) => {
  
//   console.log('sql');
//   console.log(sql);

//   connection.query(sql, (error, results) => {
//     if (typeof results !== 'undefined') {
//       resolve({
//         success: true,
//         message: 'student successfully added',
//         results,
//       });
//     }
//     resolve({ success: false, message: error });
//   });
// });


// const studentModel = {
//   create(params) {
//     console.log(params);
//     console.log('params');
//   },
// };

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

connection.connect();

exports.generateStudent = (params, pdsId) => {
  return new Promise((resolve) => {
    const year = new Date().getFullYear();

    const sql = `
          INSERT INTO student
          (
            studentTableId, studentId, personalDataSheetId,
            strandId, lrn, firstName,
            middleName, lastName, mobileNumber,
            landlineNumber, email, religion,
            guardian, birthday, gender,
            motherTongue, ethnicGroup, userId,
            status, facebook, instagram,
            placeOfBirth, gradeLevel
          )
          VALUES
          (
            "(NULL)", "${year}", "${pdsId}",
            "(NULL)", "${params.data.formOne.LRN}", "${params.data.formOne.firstName}",
            "${params.data.formOne.middleName}", "${params.data.formOne.lastName}", "${params.data.formOne.mobileNumber}",
            "${params.data.formOne.landlineNumber}", "${params.data.formOne.email}", "${params.data.formOne.religion}",
            "${params.data.formOne.guardian}", "${params.data.formOne.birthday}", "${params.data.formOne.gender}",
            "${params.data.formOne.motherTongue}", "${params.data.formOne.ethnicGroup}", "(NULL)",
            "Pending", "${params.data.formOne.facebook}", "${params.data.formOne.instagram}",
            "${params.data.formOne.placeOfBirth}", "${params.data.formOne.gradeLevel}"
          );
          `;

    connection.query(sql, (error, results) => {
      if (typeof results !== 'undefined') {
        const studentModelId = results.insertId;
        resolve(studentModelId);
      }
    });
  }).then((val) => {
    return val;
  }).catch(error => console.log('found error', error));
};
