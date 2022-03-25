const express = require('express');
const connectDB = require('./config/db');
const bookRouter = require('./routes/api/books');
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors');
const path = require("path");

// Connect Database
connectDB();

// Adding CORS
app.use(cors({ origin: true, credentials: true }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


const port = process.env.PORT || 8082;

app.use(bookRouter);

if(process.env.NODE_ENV === "production")
{
    app.use(express.static(path.resolve(__dirname, "./book_app_client/build")));

    app.get("*", function (request, response) {
        response.sendFile(path.resolve(__dirname, "./book_app_client/build", "index.html"));
      });
}
else
{
    app.get('/', (req, res) => res.send('Hello world!'));
}

app.listen(port, () => console.log(`Server running on port ${port}`));