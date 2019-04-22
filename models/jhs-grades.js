const grades = {
    addGrades(pdsID) {
        const sql = `INSERT INTO jhsGrades(jhsGradesID, personalDataSheetID) VALUES (NULL, ${pdsID})`;
        return sql;
    },

    updateGrades(grades, params) {
        return new Promise((resolve) => {
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

            // connection.query(sql, (err, results) => {
            //     if (err) {
            //         console.log('error on updating grades**', err);
            //     } else {
            //         resolve(results);
            //     }
            // });
            console.log(sql);
            resolve(sql);
        })
    },

    getGrades(pdsID) {
        return new Promise((resolve) => {
            const sql = `SELECT * FROM jhsGrades WHERE personalDataSheetID = ${pdsID};`;

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
