const role = {
    generateRoleID() {
        const sql = 'SELECT * FROM Role WHERE roleID = 1';

        return sql;
    },
};

module.exports = role;
