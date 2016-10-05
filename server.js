var mongo_client = require('mongodb').MongoClient;
var con_string = 'mongodb://localhost:27017/sample_mongo';
var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

app.get('/login.html', function (req, res) {
   res.sendFile( __dirname + "/" + "login.html" );
})
app.get('/register.html', function (req, res) {
   res.sendFile( __dirname + "/" + "register.html" );
})


app.get('/process_get', function (req, res) {


    mongo_client.connect(con_string, function(err, db) {
  if(err) {
    console.log('Error happend while connecting to mongodb');
  } else {
    // processing goes here
    console.log('Successfully connected to mongodb'); 
    var sample_doc = {
      "student_id":"5",
      "name":req.query.username,
      "loc":req.query.password
    };
    db.collection('students').insert(sample_doc, function(err, res) {
      if(err) {
        console.log('Error happened while inserting document');
      } else {
        console.log('Document inserted successfully');
      //  db.close();
      }
    });
    
    // var students_obj = db.collection('students').find({"name":"Naveen"});
    // students_obj.each(function(err, res) {
    //   console.log(res);
    // });
  }
});

   
   response = {
       username:req.query.username,
       password:req.query.password
   };
   console.log(response);
   res.end(JSON.stringify(response));
})


var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("URL is http://%s:%s", host, port)

})