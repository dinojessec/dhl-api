const education = {
  addEducation(pdsID) {
    const sql = `INSERT INTO Education(educationID, personalDataSheetID) VALUES(NULL, ${pdsID})`;
    return sql;
  },
};

module.exports = education;
