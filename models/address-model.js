const address = {
  addAddress(pdsID) {
    const sql = `INSERT INTO Address(addressID, personalDataSheetID) VALUES (NULL, ${pdsID})`;
    return sql;
  },
};

module.exports = address;
