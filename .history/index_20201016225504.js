    
    const express = require('express')
    const cors = require('cors')
    const bodyParser = require('body-parser')
    const fileUpload = require('express-fileupload');
    const MongoClient = require('mongodb').MongoClient;
    require('dotenv').config()

     
    // mongodb connect
    const uri = `mongodb+srv://${process.env.DATA_BASE_ADMIN}:${process.env.DATA_BASE_PASSWORD}@cluster0.ntqwp.mongodb.net/${process.env.DATA_BASE_NAME}?retryWrites=true&w=majority`;
    const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
    

     const app = express()
     app.use(cors())
     app.use(fileUpload());
     app.use(bodyParser.urlencoded({ extended: false }))
     app.use(bodyParser.json())


      app.get('/', (req, res) => {
        res.send('Hello World!')
      }) 


      client.connect(err => {
        const collection = client.db(`${process.env.DATA_BASE_NAME}`).collection("customer");
         console.log('database connect');
      });

      const port = 5000;
      app.listen(process.env.PORT||port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
      })