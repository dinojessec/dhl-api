const education = {
  addEducation(pdsID) {
    const sql = `INSERT INTO Education(educationID, personalDataSheetID) VALUES(NULL, ${pdsID})`;
    return sql;
  },

  updateEducation(params) {
    return new Promise((resolve) => {
      const sql = `UPDATE Education
                    SET
                      elementary = '${params.elementary}',
                      elemYear = ${params.elemYear},
                      elemHonor = '${params.elemHonor}',
                      juniorHighSchool = '${params.juniorHighSchool}',
                      jhsYear = ${params.jhsYear},
                      jhsHonor = '${params.jhsHonor}',
                      jhsLocation = '${params.jhsLocation}',
                      schoolType = '${params.schoolType}',
                      organization = '${params.organization}',
                      orgAward = '${params.orgAward}',
                    WHERE
                        personalDataSheetID = ${params.personalDataSheetID}`;

      // connection.query(sql, (error, results) => {
      //   if (typeof results !== 'undefined') {
      //     resolve(results);
      //   } else {
      //     console.log('Value Undefined' error);
      //   }
      // });
      resolve(sql);
    });
  },
};

module.exports = education;
