const express = require('express');
const connectDB = require('./config/db');
const bookRouter = require('./routes/api/books');
const app = express();
const bodyParser = require('body-parser');

// Connect Database
connectDB();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/', (req, res) => res.send('Hello world!'));

const port = process.env.PORT || 8082;

app.use(bookRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));