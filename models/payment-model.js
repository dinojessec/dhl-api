const payment = {
  checkIfNaN(value) {
    if (isNaN(value)) {
      return `"${value}"`;
    } else {
      return `${value}`;
    }
  },

  addPayment(studentID, params) {
    return new Promise(resolve => {
      let sql = `INSERT INTO Payment (paymentDate,`

      let obj = Object.keys(params);
      let objVal = Object.values(params);
      const end = Object.keys(params).length - 1;
      for (let i = 0; i <= end; i++) {
        let key = obj[i];
        if (i === end) {
          sql += ` ${key}`;
        } else {
          sql += ` ${key},`;
        }
      }
      sql += `) VALUES (CURDATE(),`
      for (let i = 0; i <= end; i++) {
        let value = objVal[i];
        if (this.checkIfNaN(value)) {
          let newVal = this.checkIfNaN(value);
          if (i === end) {
            sql += `${newVal}`;
          } else {
            sql += `${newVal},`;
          }
        }
      }
      sql += `); SET @last_inserted_id = LAST_INSERT_ID();`

      sql += `INSERT INTO student_payment(studentID, paymentID) VALUES (${studentID}, @last_inserted_id);`

      connection.query(sql, (err, result) => {
        if (err) {
          console.log(`error adding payment`, err);
        } else {
          resolve(result);
        }
      })
    })
  },

  getPayment(studentID) {
    return new Promise(resolve => {
      const sql = `SELECT student_payment.studentID, Payment.*, Student.tuition FROM student_payment
                        LEFT JOIN Payment
                          ON student_payment.paymentID = Payment.paymentID
                        LEFT JOIN Student
                          ON student_payment.paymentID = Student.studentID
                    WHERE student_payment.studentID = ${studentID}`

      connection.query(sql, (err, result) => {
        if (err) {
          console.log(`get payment error ${err}`);
        } else {
          resolve(result)
        }
      })
    })
  },

  getTotalAmount(studentID) {
    return new Promise(resolve => {
      const sql = `SELECT SUM(paymentAmount) AS total
                    FROM student_payment
                      LEFT JOIN Payment
                        ON student_payment.paymentID = Payment.paymentID
                      WHERE studentID = ${studentID}`;
      connection.query(sql, (err, result) => {
        if (err) {
          console.log('error getting total amount', err);
        } else {
          resolve(result)
        }
      })
    })
  },

  updateTuition(params) {
    return new Promise(resolve => {
      const sql = `UPDATE Student SET tuition = ${params.amount} WHERE schoolType= '${params.schoolType}'`;

      connection.query(sql, (err, result) => {
        if (err) {
          console.log(`error updating tuition`, err);
        } else {
          resolve(result)
        }
      })
    })
  },

  getStudentID(userID) {
    return new Promise(resolve => {
      const sql = `SELECT studentID, tuition FROM Student WHERE userID = ${userID}`;

      connection.query(sql, (err, result) => {
        if (err) {
          console.log(`error getting studentID`, err)
        } else {
          resolve(result)
        }
      })
    })
  }
};

module.exports = payment;
