const education = {
  addEducation(pdsID) {
    const sql = `INSERT INTO Education(educationID, personalDataSheetID) VALUES(NULL, ${pdsID})`;
    return sql;
  },

  getCurrentDate() {
    let date = new Date();
    const curDate =
      date.getFullYear() +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date.getDate()).slice(-2);
    return curDate;
  },

  updateEducation(params) {
    return new Promise((resolve) => {
      const sql = `UPDATE Education
                    SET
                      elementary = '${params.elementary}',
                      elemYear = '${!params.elemYear ? this.getCurrentDate() : params.elemYear}',
                      elemHonor = '${params.elemHonor}',
                      juniorHighSchool = '${params.juniorHighSchool}',
                      jhsYear = '${!params.jhsYear ? this.getCurrentDate() : params.jhsYear}',
                      jhsHonor = '${params.jhsHonor}',
                      jhsLocation = '${params.jhsLocation}',
                      schoolType = '${params.schoolType}',
                      organization = '${params.organization}',
                      orgAward = '${params.orgAward}',
                      als = '${params.als}',
                      pept = '${params.pept}',
                      nc = '${params.nc}'
                    WHERE
                        personalDataSheetID = ${params.personalDataSheetID}`;

      connection.query(sql, (error, results) => {
        if (error) {
          console.log('Value Undefined', error);
        } else {
          resolve(results);
        }
      });
      // resolve(sql);
    });
  },

  getSchoolType(pdsID) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT schoolType FROM Education WHERE personalDataSheetID = ${pdsID}`;

      connection.query(sql, (err, result) => {
        if (err) {
          console.log(`error getting shool type ${err}`);
        } else {
          resolve(result)
        }
      });
    })
  }
};

module.exports = education;
