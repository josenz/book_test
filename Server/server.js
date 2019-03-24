// package references
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

// app references
const booksRouter = require('./routers/books-router');

// initialization
const PORT = process.env.PORT || 8000;

// configure server

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cors());
server.use(morgan('combined'));
server.use('/api', booksRouter(PORT));


// start server

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT} ...`);
});