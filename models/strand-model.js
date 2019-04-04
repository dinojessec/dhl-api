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
      const sql = `INSERT INTO Strand(strandID, strandName) VALUES(NULL, '${params.strandName}')`;

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
};

module.exports = strand;
