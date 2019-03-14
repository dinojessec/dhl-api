const student = {
  add(pdsId, userId, params) {
    return new Promise((resolve) => {
      const input = params;

      let sql = `INSERT INTO student (`;

      // function to check if NaN
      function checkifNaN(value) {
        if (isNaN(value)) {
          return `"${value}"`;
        } else {
          return `${value}`;
        }
      };

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

    sql += `) VALUES (`;
    
    // values
    const values = Object.values(input);
    const lastVal = values.length - 1;

    for (let i = 0; i <= lastVal; i++) {
      const val = values[i];
      if (val !== '') {
        if(checkifNaN(val)) {
          const newVal = checkifNaN(val);
          if (i === lastVal) {
            sql += `${newVal}`;
          } else {
            sql += `${newVal},`;
          }
        }
      }
    }
    
    sql += `)`;

    console.log(sql);
      resolve(input);
    });
  },
};

module.exports = student;
