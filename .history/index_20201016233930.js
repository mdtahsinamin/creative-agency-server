
const express = require('express')
const app = express()
const  bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
var cors = require('cors')
const port = 5000



app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(fileUpload());




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})