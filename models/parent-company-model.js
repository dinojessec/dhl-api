exports.parentEducation = (params) => {
  const sql = `
              INSERT INTO company
              (
                  employer, employerAddress
              )
              VALUES
              (
                  "${params.data.formThree.employer}", "${params.data.formThree.employerAddress}"
                  )
              `;

  connection.query(sql, (error, results) => {
    if (typeof error !== 'undefined' && error !== null) {
      throw error;
    }
  });
};
