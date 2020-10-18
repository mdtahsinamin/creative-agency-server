
const express = require('express')
const  bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
var cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(fileUpload());


//console.log(process.env);


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://creative_agency_network:D5CtTSzZJLgIIXHA@cluster0.ntqwp.mongodb.net/creative-agencydb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("creative-agencydb").collection("Amin");
  console.log('database connection');
  
});





app.get('/',(req, res) => {
   res.send('Hello World');
})


const port = 5200;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})