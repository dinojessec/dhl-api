const payment = {
  addPayment(pdsID) {
    const sql = `INSERT INTO Payment(paymentID, personalDataSheetID) VALUES (NULL, ${pdsID})`;
    return sql;
  },
};

module.exports = payment;
