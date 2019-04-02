const document = {
  addDocument(pdsID) {
    const sql = `INSERT INTO Document(documentID, personalDataSheetID) VALUES (NULL, ${pdsID})`;
    return sql;
  },
};

module.exports = document;
