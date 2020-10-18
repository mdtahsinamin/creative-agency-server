

const cors = require('cors')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
require('dotenv').config()


app.use(fileUpload());