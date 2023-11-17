const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
const port = 6969;
const db = require('./db')
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const postRoute = require('./routes/postRoute')

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });


//middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());

db.connect();

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
});

app.get('/', (req, res) => {
  res.send('Welcome to homepage')
});

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
