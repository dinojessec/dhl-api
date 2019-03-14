const personalDataSheet = {
  generateID() {
    return new Promise((resolve) => {
      const sql = 'INSERT INTO PersonalDataSheet(PersonalDataSheetId) VALUES (NULL)';

      connection.query(sql, (error, results) => {
        if (typeof results !== 'undefined') {
          const personalDataSheetId = results.insertId;
          resolve(personalDataSheetId);
        }
        return null;
      });
    });
  },
};

module.exports = personalDataSheet;
