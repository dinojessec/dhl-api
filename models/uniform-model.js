const uniform = {
  addUniform(pdsID) {
    const sql = `INSERT INTO Uniform(uniformID, personalDataSheetID) VALUES (NULL, ${pdsID})`;
    return sql;
  },
};

module.exports = uniform;
