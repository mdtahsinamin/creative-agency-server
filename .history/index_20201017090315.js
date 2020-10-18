
const express = require('express')
const  bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
var cors = require('cors')
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;


const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(fileUpload());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ntqwp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db(`${process.env.DB_NAME}`).collection("Amin")
   .then(db => console.log('DB conectada'))
   .catch(err => console.log(error));
 });



app.get('/',(req, res) => {
   res.send('Hello World');
})


const port = 5200;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})