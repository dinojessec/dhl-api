const strand = {
  generateStrand() {
    return new Promise((resolve) => {
      const sql = 'SELECT * FROM Strand;';

      connection.query(sql, (error, results) => {
        if (typeof results !== 'undefined') {
          resolve(results);
        } else {
          throw error;
        }
      });
    });
  },

  addStrand(params) {
    return new Promise((resolve) => {
      const sql = `INSERT INTO Strand(strandID, strandName, strandCode) VALUES(NULL, '${params.strandName}', '${params.strandCode}')`;

      connection.query(sql, (err, result) => {
        if (typeof result !== 'undefined') {
          console.log('success');
          resolve(result);
        } else {
          console.log('add strand error', err);
        }
      });
    });
  },

  removeStrand(params) {
    return new Promise((resolve) => {
      const sql = `DELETE FROM Strand WHERE strandID = '${params.id}'`;

      connection.query(sql, (err, result) => {
        if (typeof result !== 'undefined') {
          console.log('success');
          resolve(result);
        } else {
          console.log('remove strand error', err);
        }
      });
    });
  },

  getStudentStrand(studentStrand) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM Strand WHERE strandID = ${studentStrand}`;

      connection.query(sql, (err, result) => {
        if (err) {
          console.log('get student strand error', err);
        } else {
          resolve(result);
        }
      });
    });
  },

  updateStudentStrand(params, userID) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE Student SET strandID = '${params.strandID}' WHERE userID = ${userID}`;
      connection.query(sql, (err, result) => {
        if (typeof result !== 'undefined') {
          console.log('success');
          resolve(result);
        } else {
          console.log('remove strand error', err);
        }
      });
    });
  },

  getStrand(strandID) {
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
                    WHERE Student.roleID = 1 AND Student.strandID = ${strandID}`;

      connection.query(sql, (err, result) => {
        if (err) {
          console.log('error getting all student strand', err);
        } else {
          resolve(result);
        }
      });
      // resolve(sql);
    })
  }
};

module.exports = strand;
