const studentProfile = {
  getStudentInfo() {
    const testID = 18;
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM User
                          LEFT JOIN student 
                              ON user.userID = student.userID 
                          LEFT JOIN strand 
                              ON student.strandID = strand.strandID
                          WHERE user.userID=${testID};`;

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
