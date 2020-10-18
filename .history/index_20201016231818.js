    
    const express = require('express')
    const MongoClient = require('mongodb').MongoClient;
    const cors = require('cors')
    const bodyParser = require('body-parser')
    const fileUpload = require('express-fileupload');
    const admin = require('firebase-admin');
    require('dotenv').config()

    
    

     const app = express()
     app.use(cors())
     app.use(fileUpload());
     app.use(bodyParser.urlencoded({ extended: false }))
     app.use(bodyParser.json())
   


     
    
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ntqwp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
    const client = new MongoClient(uri, { useNewUrlParser: true });

    
    client.connect(err => {
      const collection = client.db(`${process.env.DB_NAME}`).collection("admin");
      console.log('database connection');
     
    });


      app.get('/', (req, res) => {
        res.send('Hello World!')
      }) 
      

      const port = 5000;
      app.listen(process.env.PORT||port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
      })