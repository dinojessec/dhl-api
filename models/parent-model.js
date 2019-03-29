const parent = {
  addParent(pdsID) {
    const sql = `
              INSERT INTO parent (parentID, personalDataSheetID) VALUES(NULL, ${pdsID})`;

    return sql;
  },

  addFather(pdsID) {
    const sql = `INSERT INTO Father(personalDataSheetID, fatherID) VALUES(${pdsID}, NULL)`;

    return sql;
  },

  addMother(pdsID) {
    const sql = `INSERT INTO Mother(personalDataSheetID, motherID) VALUES(${pdsID}, NULL)`;

    return sql;
  },
};

module.exports = parent;
