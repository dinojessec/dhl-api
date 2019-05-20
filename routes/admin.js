const express = require('express');

const router = express.Router();

const strandModel = require('../models/strand-model');
const studentModel = require('../models/student-model');
const jhsModel = require('../models/jhs-grades');

router.get('/strand', (req, res) => {
  const { roleID } = req;
  if (roleID >= 2) {
    strandModel.generateStrand().then((strandModelResult) => {
      const strandData = strandModelResult;
      res.json({ strandData });
    });
  } else { res.json({ message: 'access denied' }); }
});

router.post('/strand', (req, res) => {
  const params = req.body;
  const { roleID } = req;
  if (params !== ' ') {
    if (roleID >= 2) {
      strandModel.addStrand(params).then((response) => {
        if (response !== 'undefined') {
          console.log(response);
        } else {
          console.log('add strand response error');
        }
      });
    }
  }
});

router.put('/strand', (req, res) => {
  const params = req.body;
  console.log(params);
  strandModel.removeStrand(params).then((response) => {
    if (response !== 'undefined') {
      console.log(response);
    } else {
      console.log('update strand error');
    }
  });
});

router.get('/student', (req, res) => {
  const { roleID } = req;
  if (roleID < 2) {
    console.log(`user notallowed to access`);
  } else {
    studentModel.getAllStudent().then(response => {
      // console.log(response);
      jhsModel.getGrades().then(gradesRes => {
        // console.log(res);
        res.json({ response, gradesRes });
      })
    })
  }

});

// get student based on strand
router.get('/student/strand/:strandID', (req, res) => {
  const strandID = req.params.strandID;
  // console.log('strand id =======', strandID);
  const { roleID } = req;
  if (roleID < 2) {
    console.log(`user not allowed to access`);
  } else {
    strandModel.getStrand(strandID).then(response => {
      // console.log(response);
      res.json({ response });
    })
  }
})
// get student based on grade level
router.get('/student/gradelevel/:grade', (req, res) => {
  const grade = req.params.grade;
  const { roleID } = req;
  if (roleID < 2) {
    console.log(`user not allowed to access`);
  } else {
    studentModel.getStudentGradeLevel(grade).then(response => {
      console.log(response);
      res.json({ response })
    })
  }
})
// get student based on age
router.get('/student/age', (req, res) => {
  const { roleID } = req;
  if (roleID < 2) {
    console.log(`user not allowed to access`);
  } else {
    studentModel.getStudentByAge().then(response => {
      console.log('response ========', response[0]);
      res.json({ response })
    })
  }
})

router.get('/student/:gender', (req, res) => {
  const { roleID } = req;
  const { gender } = req.params;
  if (roleID < 2) {
    console.log(`user not allowed to access`);
  } else {
    studentModel.getStudentByGender(gender).then(response => {
      console.log(`response ============ ${response}`)
      res.json({ response });
    })
  }
})

router.get('/checkout/:userID', (req, res) => {
  const { roleID } = req;
  const userID = req.params.userID;
  if (roleID < 2) {
    console.log(`user notallowed to access`);
  } else {
    studentModel.getStudentCheckout(userID).then(response => {
      const resVal = response[0];
      res.json({ resVal });
      console.log(resVal);
    })
  }
});

module.exports = router;
