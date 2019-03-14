exports.addEducation = (params, pdsId) => {
  const sql = `
        INSERT INTO education
        (
            elementary, elemYear, elemHonors,
            elemLocation, juniorHighSchool, jhsYear,
            jhsHonors, jhsLocation,

            // organization, orgAwards,

            preferredShift, preferredCourse, pdsId
        )
        VALUES
        (
            "${params.data.formFour.elementary}", "${params.data.formFour.elemYear}", "${
  params.data.formFour.elemHonors
}",
            "${params.data.formFour.elemLocation}", "${params.data.formFour.juniorHighSchool}", "${
  params.data.formFour.jhsYear
}",
            "${params.data.formFour.jhsHonors}", "${params.data.formFour.jhsLocation}", 
            // "${params.data.formFour.organization}", "${params.data.formFour.orgAwards}", 
            "${params.data.formFour.preferredShift}", "${
  params.data.formFour.preferredCourse
}", ${pdsId}
        )
    `;

  connection.query(sql, (error, results) => {
    if (typeof error !== 'undefined' && error !== null) {
      throw error;
    }
  });
};
