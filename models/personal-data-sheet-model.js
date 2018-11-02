exports.generateID = () => {
  const sql = 'INSERT INTO PersonalDataSheet VALUES (NULL)';

  connection.query(sql, (error, results) => {
    if (typeof results !== 'undefined') {
      const personalDataSheetID = results.insertId;
      return personalDataSheetID;
    }
    return null;
  });
};
