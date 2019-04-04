const address = {
  addAddress(pdsID) {
    const sql = `INSERT INTO Address(addressID, personalDataSheetID) VALUES (NULL, ${pdsID})`;
    return sql;
  },

  updateAddress(params) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE Address
      SET 
          homeAddress = '${params.homeNumber}',
          streetName = '${params.streetName}',
          barangay = '${params.barangay}',
          town = '${params.town}',
          city = '${params.city}',
      WHERE
          personalDataSheetID = ${params.personalDataSheetID}`;

      // connection.query(sql, (error, results) => {
      //   if (typeof results !== 'undefined') {
      //     resolve(results);
      //   } else {
      //     reject(error);
      //     console.log('error on update address');
      //   }
      // });
      resolve(sql);
    });
  },
};

module.exports = address;
