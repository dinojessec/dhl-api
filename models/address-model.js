exports.addAddress = (params, pdsId) => {
  const sql = `
          INSERT INTO address
          (
              homeNumber, streetName, barangay,
              town, city, personalDataSheetId
          )
          VALUES
          (
              "${params.data.formTwo.homeNumber}", "${params.data.formTwo.streetName}", "${
  params.data.formTwo.barangay
}",
              "${params.data.formTwo.town}", "${params.data.formTwo.city}", ${pdsId}
              )
          `;

  connection.query(sql, (error, results) => {
    if (typeof error !== 'undefined' && error !== null) {
      throw error;
    }
  });
};
