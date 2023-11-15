const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');
const port = 6969;
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');


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
app.use(helmet());
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.send('Welcome to homepage')
});

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
});
