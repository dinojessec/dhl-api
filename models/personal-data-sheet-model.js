exports.generateID = () => new Promise((resolve) => {
  const sql = 'INSERT INTO PersonalDataSheet VALUES (NULL)';

  connection.query(sql, (error, results) => {
    if (typeof results !== 'undefined') {
      const personalDataSheetID = results.insertId;
      return personalDataSheetID;
    }
    return null;
  });

  connection.query(sql, (error, results) => {
    if (typeof results !== 'undefined') {
      resolve(results.insertId);
    }
    resolve({ success: false, message: error });
  });
});
