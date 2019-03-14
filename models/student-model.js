const student = {
  add(pdsId, userId, params) {
    const input = params;

    let sql = `INSERT INTO student (`;
// const params = {
//   username: 'tupasjuanchob',
// 	firstName: 'Juancho',
// 	middleName: 'B',
// 	lastName: 'Tupas',
// 	password: '123456',
// 	ALS: 'Yes',
// 	PEPT: 'Yes',
// 	NC: 'Yes',
// 	gradeLevel: 'Grade11',
// 	LRN: '234',
// 	birthday: '2019-03-22',
// 	placeOfBirth: 'Marikina',
// 	sex: 'Male',
// 	mobileNumber: '09172222222',
// 	guardian: '',
// 	motherTongue: 'Filipino',
// 	religion: 'Iglesia ni cristo',
// 	ethnicGroup: 'Manileno'
// };

    // function to check if NaN
    function checkifNaN(value) {
      if (isNaN(value)) {
        return `"${value}"`;
      } else {
        return `${value}`;
      }
    };

      // columns
    let keys = Object.keys(input);
    let end = keys.length - 1;
    for (let i = 0; i <= end; i++) {
      let key = keys[i];
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
    let values = Object.values(input);
    let lastVal = values.length - 1;

    for (let i = 0; i <= lastVal; i++) {
      let val = values[i];
      if (val !== '') {
        if(checkifNaN(val)) {
          let newVal = checkifNaN(val);
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
    return new Promise((resolve) => {
      resolve(input);
    });
  },
};

module.exports = student;
