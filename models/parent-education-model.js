exports.parentEducation = (params) => {
  const sql = `
            INSERT INTO ParentEducation
            (
                educationalAttainment, schoolGraduated
            )
            VALUES
            (
                "${params.data.formThree.educationalAttainment}", "${
  params.data.formThree.schoolGraduated
}"
                )
            `;

  connection.query(sql, (error, results) => {
    if (typeof error !== 'undefined' && error !== null) {
      throw error;
    }
  });
};
