

const cors = require('cors')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
require('dotenv').config()


app.use(cors())
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())