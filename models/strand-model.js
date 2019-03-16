const strand = {
  generateStrand() {
    return new Promise((resolve) => {
      const sql = 'SELECT * FROM dhl_db.strand;';

      connection.query(sql, (error, results) => {
        if (typeof results !== 'undefined') {
          resolve(results);
        } else {
          throw error;
        }
      });
    });
  },
};

module.exports = strand;
