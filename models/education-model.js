const education = {
  addEducation(pdsID) {
    const sql = `INSERT INTO education(educationID, personalDataSheetID) VALUES(NULL, ${pdsID})`;
    return sql;
  },
};

module.exports = education;
