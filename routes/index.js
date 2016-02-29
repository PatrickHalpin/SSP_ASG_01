var express = require('express');
var router = express.Router();
var fs = require("fs");

//create an array to store screts 
var secrets=[];

//check if the secrets file exists and if so..
//read the secrets file and load in any existing secrets into the array
//after converting them from string to JSON
fs.exists("secrets.txt", function(exists)
 {
  if (exists) 
  {
    fs.readFile('secrets.txt', (err, data) => 
    {
    if (err) throw err;
    var parsedJSON = JSON.parse(data);
    secrets=parsedJSON;
    });
  } 
});


router.get('/', function(req, res, next)
 {
  if (req.body.back)
  {
    res.render('secrets');
  }
  else
  res.render('secrets');
});

router.get('/wrong', function(req, res, next)
 {
  res.render('wrong');
});

router.get('/secrets', function(req, res, next)
 {
  res.render('secrets');
});

router.post('/secrets', function(req, res, next)
{
    
  //checks if username and passwords match  
  if (req.body.yourPassword == "password" && req.body.yourName == "pat")
  {
    res.render('secrets', {yourName: req.body.yourName, pwd: req.body.yourPassword});
  }

  else if (req.body.yourSecret)
  {
    //adds secret from user inout to the array
    secrets.push(req.body.yourSecret);
    //comvert from JSON to string
    var jsonString = JSON.stringify(secrets);
    //Save as a file which will be read when program is started 
    fs.writeFile("secrets.txt", jsonString, function(error)
    {
    if (error) throw error;
   
    });
    //after adding your secret you are sent to the secrets page
    res.render('index',{secrets: secrets, yourSecret: req.body.yourSecret});
  }

  else
   {
      //if user name and password dont match you are rediretced to the incorrrect password page
      res.redirect('/wrong');
  }
});

module.exports = router;
