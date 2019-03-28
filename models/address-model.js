const address = {
  addAddress(pdsID) {
    const sql = `INSERT INTO address(addressID, personalDataSheetID) VALUES (NULL, ${pdsID})`;
    return sql;
  },
};

module.exports = address;
