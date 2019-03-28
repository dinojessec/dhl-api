const personalDataSheet = {
  generatePdsID() {
    const sql = 'INSERT INTO PersonalDataSheet(PersonalDataSheetId) VALUES (NULL)';

    return sql;
  },
};

module.exports = personalDataSheet;
