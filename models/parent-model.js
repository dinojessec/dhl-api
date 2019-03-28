const parent = {
  addParent(pdsID) {
    const sql = `
              INSERT INTO parent (parentID, personalDataSheetID) VALUES(NULL, ${pdsID})`;

    return sql;
  },
};

module.exports = parent;
