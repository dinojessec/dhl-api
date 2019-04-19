const voucher = {
  addVoucher(pdsID) {
    const sql = `INSERT INTO Voucher(voucherID, personalDataSheetID) VALUES (NULL, ${pdsID})`;
    return sql;
  },

  updateVoucher(type, data, pdsID) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE Voucher SET voucherType = '${type}', voucherCode = ${data} WHERE personalDataSheetID = ${pdsID}`;

      connection.query(sql, (err, result) => {
        if (err) {
          console.log('error updateing the voucher', err);
        } else {
          resolve(result);
        }
      })
    })
  }
};

module.exports = voucher;
