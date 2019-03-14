const student = {
  // function to check if NaN
  checkifNaN(value) {
    if (isNaN(value)) {
      return `"${value}"`;
    } else {
      return `${value}`;
    }
  },

  add(pdsId, userId, params) {
    return new Promise((resolve) => {
      const input = params;
      input.personlDataSheetId = pdsId;
      input.userId = userId;
      // delete input.username;
      // delete input.password;

      let sql = 'INSERT INTO student (';

      // columns
      const keys = Object.keys(input);
      const end = keys.length - 1;
      for (let i = 0; i <= end; i++) {
        const key = keys[i];
        if (key !== '') {
          if (i === end) {
            sql += `${key}`;
          } else {
            sql += `${key},`;
          }
        }
      }

      sql += ') VALUES (';
      // values
      const values = Object.values(input);
      const lastVal = values.length - 1;

      for (let i = 0; i <= lastVal; i++) {
        const val = values[i];
        if (val !== '') {
          if (student.checkifNaN(val)) {
            const newVal = student.checkifNaN(val);
            if (i === lastVal) {
              sql += `${newVal}`;
            } else {
              sql += `${newVal},`;
            }
          }
        }
      }

      sql += ')';

      console.log(sql);
      resolve(input);
    });
  },
};

module.exports = student;
