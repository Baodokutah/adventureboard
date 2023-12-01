const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./db')

// routes
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const postRoute = require('./routes/postRoute');
const commentRoute = require('./routes/commentRoute');
const notiRoute = require('./routes/notiRoute');

dotenv.config();

//middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());

db.connect();

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`)
});

app.get('/', (req, res) => {
  res.send('Welcome to homepage')
});

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/comment', commentRoute);
app.use('/api/post', postRoute);
app.use('/api/noti', notiRoute);
