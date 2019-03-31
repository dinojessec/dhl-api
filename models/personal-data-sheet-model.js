const personalDataSheet = {
  generatePdsID() {
    const sql = 'INSERT INTO PersonalDataSheet(PersonalDataSheetID) VALUES (NULL);';

    return sql;
  },
};

module.exports = personalDataSheet;
