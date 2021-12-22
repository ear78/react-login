const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config');
const api = require('./src/routes/contacts');
const check = require('./src/routes/users');

const app = express();
const PORT = 3000;

// Connection setup
mongoose.connect(`mongodb+srv://${config.dbUser}:${config.dbPass}@cluster0.m8vqa.mongodb.net/reactLogin?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });

// Bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cookie Parser
app.use(cookieParser());

// Protected Routes
app.use('/auth', check);
app.use('/api', api);

app.listen(3000, () => {
  console.log('Server is running...', PORT);
});

// Serving static files
// app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send(`Node and express is running at port ${PORT}`);
});
