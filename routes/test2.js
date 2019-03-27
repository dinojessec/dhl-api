let sql = 'INSERT INTO student (status,';

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

sql += ') VALUES ("pending",';
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
