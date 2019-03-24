const studentProfile = {
  getStudentInfo() {
    const testID = 32;
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM user
                          LEFT JOIN student 
                              ON user.userId = student.userId 
                          LEFT JOIN strand 
                              ON student.strandId = strand.strandId 
                          WHERE user.userId=${testID};`;

      connection.query(sql, (error, result) => {
        if (result !== 'undefined') {
          const sqlValue = result;
          resolve(sqlValue);
        } else {
          reject(error);
        }
      });
    });
  },
};

module.exports = studentProfile;
