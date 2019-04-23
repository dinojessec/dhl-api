const parent = {
  addParent(pdsID) {
    const sql = `
              INSERT INTO parent (parentID, personalDataSheetID) VALUES(NULL, ${pdsID})`;

    return sql;
  },

  addFather(pdsID) {
    const sql = `INSERT INTO Father(personalDataSheetID, fatherID) VALUES(${pdsID}, NULL)`;

    return sql;
  },

  addGuardian(pdsID) {
    const sql = `INSERT INTO Guardian(personalDataSheetID, guardianID) VALUES (${pdsID}, NULL)`;

    return sql;
  },

  addMother(pdsID) {
    const sql = `INSERT INTO Mother(personalDataSheetID, motherID) VALUES(${pdsID}, NULL)`;

    return sql;
  },

  updateFather(params) {
    return new Promise((resolve) => {
      const sql = `UPDATE Father
                    SET 
                       fatherName = '${params.fatherName}',
                       fatherHomeNumber = '${params.fatherHomeNumber}',
                       fatherStreetName = '${params.fatherStreetName}',
                       fatherBarangay = '${params.fatherBarangay}',
                       fatherTown = '${params.fatherTown}',
                       fatherCity = '${params.fatherCity}',
                       fatherOccupation = '${params.fatherOccupation}',
                       fatherEmployer = '${params.fatherEmployer}',
                       fatherEmployerAddress = '${params.fatherEmployerAddress}',
                       fatherEducationalAttainment = '${params.fatherEducationalAttainment}',
                       fatherSchoolGraduated = '${params.fatherSchoolGraduated}',
                       fatherReligion = '${params.fatherReligion}',
                       fatherMobileNumber = ${params.fatherMobileNumber},
                       fatherLandlineNumber = ${params.fatherLandlineNumber}
                    WHERE
                        personalDataSheetID = ${params.personalDataSheetID}`;

      connection.query(sql, (error, results) => {
        if (error) {
          console.log('Value Undefined', error);
        } else {
          resolve(results);
        }
      });
      // console.log(sql);
      // resolve(sql);
    });
  },

  updateMother(params) {
    return new Promise((resolve) => {
      const sql = `UPDATE Mother
                    SET 
                       motherName = '${params.motherName}',
                       motherHomeNumber = '${params.motherHomeNumber}',
                       motherStreetName = '${params.motherStreetName}',
                       motherBarangay = '${params.motherBarangay}',
                       motherTown = '${params.motherTown}',
                       motherCity = '${params.motherCity}',
                       motherOccupation = '${params.motherOccupation}',
                       motherEmployer = '${params.motherEmployer}',
                       motherEmployerAddress = '${params.motherEmployerAddress}',
                       motherEducationalAttainment = '${params.motherEducationalAttainment}',
                       motherSchoolGraduated = '${params.motherSchoolGraduated}',
                       motherReligion = '${params.motherReligion}',
                       motherMobileNumber = ${params.motherMobileNumber},
                       motherLandlineNumber = ${params.motherLandlineNumber}
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
};

module.exports = parent;
