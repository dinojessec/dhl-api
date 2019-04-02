const voucher = {
  addVoucher(pdsID) {
    const sql = `INSERT INTO Voucher(voucherID, personalDataSheetID) VALUES (NULL, ${pdsID})`;
    return sql;
  },
};

module.exports = voucher;
