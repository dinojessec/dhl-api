exports.addParent = (params, pdsId, parentEducationId, parentCompanyId, addressId) => {
  const sql = `
            INSERT INTO parent
            (
                fatherName, fatherOccupation, fatherReligion,
                fatherMobile, fatherLandline,
                motherName, motherOccupation, motherReligion,
                motherMobile, motherLandline,
                personalDataSheetId, parentEducationId, parentCompanyId,
                addressId
            )
            VALUES
            (
                "${params.data.fromThree.fatherName}", "${
  params.data.fromThree.fatherOccupation
}", "${params.data.fromThree.fatherReligion}",
                "${params.data.fromThree.fatherMobile}", "${params.data.fromThree.fatherLandline}", 
                "${params.data.fromThree.motherName}", "${
  params.data.fromThree.motherOccupation
}", "${params.data.fromThree.motherReligion}",
                "${params.data.fromThree.motherMobile}", "${params.data.fromThree.motherLandline}",
                ${pdsId}, ${parentEducationId}, ${parentCompanyId},
                ${addressId}
                )
            `;
  connection.query(sql, (error, results) => {
    if (typeof error !== 'undefined' && error !== null) {
      throw error;
    }
  });
};
