var router = require('express').Router();
const pool = require('./db');
const crypto = require('crypto');

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Leagues manager',
    si: false,
    ba: false,
    notgood: false,
    rows: [],
    security: false
  });
});

router.post('/sqlinjection', async function(req,res,next){
  if(req.body.checkbox == "on" && isNaN(req.body.inputField)){
      res.render('index', {
        title: 'Leagues manager',
        si: true,
        ba: false,
        rows: NaN,
        notgood: true,
        security: true
      });
  }else{


    const usersQuery = {
      text: 'SELECT * FROM users WHERE id = '+req.body.inputField
    }

    pool.query(usersQuery, (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
      } else {
        console.log('Query results:', results.rows);
      }

      let result = results.rowCount == 0 ? error : results.rows

      sec = results.rowCount == 0 ? true : false

      res.render('index', {
        title: 'Leagues manager',
        si: true,
        ba: false,
        security: sec,
        rows: results.rows,
        notgood: false
      });
    });
}
});

router.post('/brokenauth', async function(req,res,next){
  un = req.body.username
  pass = req.body.password

  if(req.body.checkbox == "on"){
    pass = hashPassword(pass)
  }

    const usersQuery = {
      text: 'INSERT INTO users (username, password) VALUES($1, $2)',
      values: [un,pass]
    }

    pool.query(usersQuery, (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
      } else {
        console.log('Query results:', results.rows);
      }

    let text = "NOTE: VALUES " + un + " " + pass + " ADDED TO DATABASE"

    res.render('index', {
      title: 'Leagues manager',
      si: false,
      ba: true,
      rows: false,
      security: false,
      notgood: false,
      text: text
    });

  });


});


function hashPassword(password) {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
}
module.exports = router;
