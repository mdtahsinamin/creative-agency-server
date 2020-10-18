    
    const express = require('express')
    const cors = require('cors')
    const bodyParser = require('body-parser')
    const fileUpload = require('express-fileupload');
    require('dotenv').config()



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