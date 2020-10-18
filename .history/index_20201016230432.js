    
    const express = require('express')
    const cors = require('cors')
    const bodyParser = require('body-parser')
    const fileUpload = require('express-fileupload');
    const admin = require('firebase-admin');
    require('dotenv').config()

    console.log(process.env);
    

     const app = express()
     app.use(cors())
     app.use(fileUpload());
     app.use(bodyParser.urlencoded({ extended: false }))
     app.use(bodyParser.json())


      app.get('/', (req, res) => {
        res.send('Hello World!')
      }) 
      

      const port = 5000;
      app.listen(process.env.PORT||port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
      })