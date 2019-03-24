'use strict';

// package references
const express = require('express');

// app references
const BookManager = require('../Services/BookManager');

// initialization
const bookManager = new BookManager();

// build router

const booksRouter = () => {
    const router = express.Router();

    router
        .delete('/books/:id', (request, response) => {

            const { id } = request.params;

            if (!id) {
                response.status(400).send('Name is required');
            } else {
                bookManager
                    .removeBook(id)
                    .then(() => response.status(200).send('Book deleted'))
                    .catch(error => {
                        console.log(error.message);
                        response.status(500).send();
                    });
            }
        })
        .get('/books/:id', (request, response) => {

            const { id } = request.params;

            if (!id) {
                response.status(400).send('Id is required');
            } else {
                bookManager
                    .findBookById(id)
                    .then(book => response.json(book))
                    .catch(error => {
                        console.log(error.message);
                        response.status(500).send();
                    });
            }
        })
        .get('/books', (request, response) => {

            const { name, tag } = request.query;

            if (name) {
                bookManager
                    .findBooksByName(name)
                    .then(books => response.json(books))
                    .catch(error => {
                        console.log(error);
                        response.status(500).send();
                    });
            } else if (tag) {
                bookManager
                    .findBooksByTag(tag)
                    .then(books => response.json(books))
                    .catch(error => {
                        console.log(error);
                        response.status(500).send();
                    });
            } else {
                bookManager
                    .listBooks()
                    .then(books => response.json(books))
                    .catch(error => {
                        console.log(error);
                        response.status(500).send();
                    });
            }
        })
        .post('/books', (request, response) => {
            console.log(request.body);
            const { price, name, description, image, tags } = request.body;

            if (!price) {
                response.status(400).send('Price is required');
            } else if (!name) {
                response.status(400).send('Name is required');
            } else if (!description) {
                response.status(400).send('Description is required');
            } else if (!image) {
                response.status(400).send('Image is required');
            } else {
                bookManager
                    .addBook(price, name, description, image, tags)
                    .then(id => response.status(201).send({ id: id }))
                    .catch(error => {
                        console.log(error.message);
                        response.status(500).send(error.message);
                    });
            }
        })
        .put('/books', (request, response) => {

            const { id, price, name, description, image, tags } = request.body.book;

            if (!id) {
                response.status(400).send('Id is required');
            } else if (!price) {
                response.status(400).send('Price is required');
            } else if (!name) {
                response.status(400).send('Name is required');
            } else if (!description) {
                response.status(400).send('Description is required');
            } else if (!image) {
                response.status(400).send('Image is required');
            } else {
                bookManager
                    .updateBook(id, price, name, description, image, tags)
                    .then(() => response.status(200).send())
                    .catch(error => {
                        console.log(error.message);
                        response.status(500).send(error.message);
                    });
            }
        })
        .patch('/books/:id', (request, response) => {

            // not an entirely correct use of patch but convenient 
            // in terms of providing the 'tag' functionality

            const { id } = request.params;
            const { tags } = request.body;

            if (!id) {
                response.status(400).send('Id is required');
            } else if (!tags) {
                response.status(400).send('Tags is required');
            } else {
                bookManager
                    .tagBook(id, tags)
                    .then(() => response.status(200).send('Tagged book'))
                    .catch(error => {
                        console.log(error.message);
                        response.status(500).send();
                    });
            }
        });

    return router;
};

module.exports = booksRouter;