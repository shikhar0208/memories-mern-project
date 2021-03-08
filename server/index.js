const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

const postRoutes = require('./routes/posts');

app.use(cors()); //use cors middleware
app.use(bodyParser.json({ limit: '30mb', extended: true })); //to parse json data that our server sending and receiving
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

app.use('/posts', postRoutes);

app.get('/', (req, res) => {
  res.send('API RUNNING');
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection establised successfully');
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
