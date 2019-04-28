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

    getGrades(studentID) {
        return new Promise((resolve) => {
            const sql = `SELECT Student.studentID, jhs_grades.*
                            FROM Student
                                LEFT JOIN student_jhs_grade
                                    ON student_jhs_grade.studentID = Student.studentID
                                LEFT JOIN jhs_grades
                                    ON jhs_grades.jhs_grade_id = student_jhs_grade.jhs_grade_id`;

            connection.query(sql, (err, result) => {
                if (err) {
                    console.log('error on getting grades**', err);
                } else {
                    resolve(result)
                }
            });
        })
    },

    postGrades(params, studentID) {
        return new Promise(resolve => {
            const sql = `INSERT INTO jhs_grades (
                                        jhs_subject,
                                        jhs_first_grade,
                                        jhs_second_grade,
                                        jhs_third_grade,
                                        jhs_fourth_grade,
                                        jhs_final_grade,
                                        )
                                VALUES (
                                    '${params.subject}',
                                    ${params.first},
                                    ${params.second},
                                    ${params.third},
                                    ${params.fourth},
                                     ${params.final},
                                     );
                        SET @last_insert_id = LAST_INSERT_ID();
                        INSERT INTO student_jhs_grade(studentID, jhs_grade_id) 
                            VALUES (${studentID}, @last_insert_id)`;

            connection.query(sql, (err, result) => {
                if (err) {
                    console.log('post grades error', err);
                } else {
                    resolve(result)
                }
            });
        })
    },

    removeGrade(params, studentID) {
        return new Promise(resolve => {
            const sql = `DELETE FROM jhs_grades WHERE jhs_grade_id = ${params.jhs_grade_id}`;

            connection.query(sql, (err, result) => {
                if (err) {
                    console.log('error removing grade', err);
                } else {
                    resolve(result);
                }
            });
        })
    }
}

module.exports = grades;
