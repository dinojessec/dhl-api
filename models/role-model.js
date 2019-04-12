const role = {
    generateRoleID(roleID) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT Student.studentID, Student.firstName, Student.middleName, Student.lastName, Role.roleID, Role.roleName
                        FROM Role
                            LEFT JOIN Student
                                ON Role.roleID = Student.roleID
                            WHERE Student.roleID = ${roleID}`;

            connection.query(sql, (err, result) => {
                if (err) {
                    console.log('roleID error', err);
                } else {
                    resolve(result);
                }
            });
            // resolve(sql);
        });
    },

    updateRole(params) {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE Student SET roleID = ${params.roleID} WHERE studentID = ${params.studentID}`;

            connection.query(sql, (err, result) => {
                if (err) {
                    console.log('UPDATE ROLE ERROR', ERR);
                } else {
                    resolve(result);
                }
            });
            // resolve(sql);
        })
    }
};

module.exports = role;
