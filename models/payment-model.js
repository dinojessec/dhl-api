const payment = {
  addPayment(pdsID) {
    const sql = `INSERT INTO Payment(paymentID, personalDataSheetID) VALUES (NULL, ${pdsID})`;
    return sql;
  },

  getPayment(voucherRes) {
    return new Promise(resolve => {
      const pds = voucherRes.personalDataSheetID;
      const sql = `SELECT * FROM Payment WHERE personalDataSheetID = ${pds}`

      connection.query(sql, (err, result) => {
        if (err) {
          console.log(`get payment error ${err}`);
        } else {
          resolve(result)
        }
      })
    })
  },

  updateTuition(params) {
    return new Promise(resolve => {
      const sql = `UPDATE Payment SET tuition = ${params.amount} WHERE schoolType= '${params.schoolType}'`;

      connection.query(sql, (err, result) => {
        if (err) {
          console.log(`error updating tuition`, err);
        } else {
          resolve(result)
        }
      })
    })
  }
};

module.exports = payment;
