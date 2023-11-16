const express = require('express');
const db = require('./db')
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()


const app = express();
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
db.connect()
app.listen(port,() => {
    console.log(`listening on port ${port}`)
})


const postRoute = require('./routes/postRoute')
app.use('/api/',postRoute)