var express = require('express');
var router = express.Router();
var pg = require('pg');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'API Home Page' });
});
 
 var pg = require('pg');

router.get('/api/initdb', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('CREATE TABLE notes(title TEXT, message TEXT);', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.json(result );}
    });
  });
})


router.get('/api/getnotes', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM notes;', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.json(result );}
    });
  });
})

router.get('/api/addnote', function (request, response) {
	var title = request.query.title;
	var message = request.query.message;

  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
  	//INSERT INTO notes(title, message) VALUES('tomer', 'moshe');
    client.query('INSERT INTO notes(title, message) VALUES('+title+','+message+');', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.json(result );}
    });
  });
})

module.exports = router;
