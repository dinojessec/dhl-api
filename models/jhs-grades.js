const grades = {
    addGrades(pdsID) {
        const sql = `INSERT INTO jhsGrades(jhsGradesID, personalDataSheetID) VALUES (NULL, ${pdsID})`;
        return sql;
    },

    updateGrades(grades, params) {
        return new Promise((resolve) => {
            if (grades !== undefined) {
                let sql = `UPDATE jhsGrades SET `

                let obj = Object.keys(grades);
                let objVal = Object.values(grades);
                const end = Object.keys(grades).length - 1;
                for (let i = 0; i <= end; i++) {
                    let key = obj[i];
                    let value = objVal[i];
                    if (i === end) {
                        sql += ` ${key} = ${value}`;
                    } else {
                        sql += ` ${key} = ${value},`;
                    }
                }
                sql += ` WHERE personalDataSheetID = ${params.personalDataSheetID}`

                connection.query(sql, (err, results) => {
                    if (err) {
                        console.log('error on updating grades**', err);
                    } else {
                        resolve(results);
                    }
                });
            }
        })
    },

    getGrades(pdsID) {
        return new Promise((resolve) => {
            const sql = `SELECT *,
                            SUM((math1 + math2 + math3 + math4)/4) AS mathFinal,
                            SUM((english1 + english2 + english3 + english4)/4) AS englishFinal,
                            SUM((filipino1 + filipino2 + filipino3 + filipino4)/4) AS filipinoFinal,
                            SUM((science1 + science2 + science3 + science4)/4) AS scienceFinal
                                FROM dhl_dev.jhsGrades
                                    WHERE personalDataSheetID = 1
                            GROUP BY jhsGradesID`;

            connection.query(sql, (err, result) => {
                if (err) {
                    console.log('error on getting grades**', err);
                } else {
                    resolve(result)
                }
            });
        })
    }
}

module.exports = grades;
