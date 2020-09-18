var express = require('express');
var app = express();
const fileUpload = require('express-fileupload');
app.use(fileUpload());
var mongoose = require('mongoose'),
    bodyParser = require('body-parser');


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://kxxing:<password>@cluster0.yvcb3.mongodb.net/<dbname>?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb+srv://kxxing:kxxing@cluster0.yvcb3.mongodb.net/<dbname>?retryWrites=true&w=majority");
app.use(express.static("assets"));
app.set("view engine", "ejs");

var booknote = [
    {name: "Why Be Happy When You Can Be Normal", html: "why-be-happy-when-you-can-be-normal.html"},
    {name: "Beneath A Scarlet Sky", html: "beneath-a-scarlet-sky.html"}
]

var booknoteSchema = new mongoose.Schema({
    name:String,
    html:String
});
var Booknote = mongoose.model("Booknote",booknoteSchema);
// Booknote.create({name: "Why Be Happy When You Can Be Normal", html: "why-be-happy-when-you-can-be-normal.html"});

app.get('/',function(req, res){
    Booknote.find({},function(err,allBooknotes){
        if (err){
            console.log(err);
        }else{
            res.render("home",{Booknotes: allBooknotes});
        }
    });
    // res.render("home");
});
app.post('/upload', function(req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.sampleFile;
  
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv('views/booknotes/test.html', function(err) {
      if (err)
        return res.status(500).send(err);
  
      res.send('File uploaded!');
    });
  });
app.post('/',function(req,res){
    // save file to views/booknotes

    var name = req.body.name;
    var html = req.body.html;
    var newBooknote = {name:name, html:html};
    Booknote.create(newBooknote,function(err, newlyCreated){
        if(err){console.log(err)
        }else{res.redirect('/')}
    });
});

app.get('/topeter',function(req,res){
    res.render("letter");
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server Has Started!");
  });