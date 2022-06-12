// import require dependencies for the project
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// import the routes files used for the functionality
const usersRouter = require('./routes/users');
const exercisesRouter = require('./routes/exercises');

// initialise the app by using express
const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(cors());

// API endpoints
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

// connect to the database
const mongoURI =
  'mongodb+srv://admin:admin@cluster0.yxie28z.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoURI, {
  // useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established sucessfully');
});

app.get('/', (req, res) => {
  res.status(200).send('Hello World');
});

// start the server on the required port
app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});
