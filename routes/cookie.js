const express = require('express');

const router = express.Router();

// localhost:4000/cookie/
router.get('/', (req, res) => {
  res.render('cookie');
});

router.get('/cook', (req, res) => {
  // 키 : alert , value : true
  res.cookie('alert', true, {
    maxAge: 1000 * 5,
    httpOnly: false,
  });
  res.status(200).json('쿠기 굽기 성공');
});

module.exports = router;
