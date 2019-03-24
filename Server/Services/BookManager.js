'use strict';

const BookRepository = require('../DataAccess/BookRepository');
const assert = require('assert');
const bookRepository = new BookRepository();

const mapToBookDto = (book) => {
    assert(book, 'book is required');

    return {
        id: book._id,
        price: book.price,
        name: book.name,
        description: book.description,
        image: book.image,
        tags: book.tags,
        createdDate: book.created_date,
        updatedDate: book.updated_date
    };
};

const createUpdatedBook = (price, name, description, image, tags) => {
    return {
        price: price,
        name: name,
        description: description,
        image: image,
        tags: !Array.isArray(tags) ? convertTagsCsvToArray(tags) : tags,
        updated_date: new Date()
    };
};

const createNewBook = (price, name, description, image, tags) => {
    return {
        price: price,
        name: name,
        description: description,
        image: image,
        tags: convertTagsCsvToArray(tags),
        created_date: new Date(),
        updated_date: new Date()
    };
};

const convertTagsCsvToArray = (tags) => {

    var exp = new RegExp(/^((\w+)((,)?|(,\s)))*$/);
    assert(exp.test(tags), 'Invalid list of tags specified');

    return tags
        ? Array.from(new Set(tags.split(',').map(tag => tag.toLowerCase())))
        : [];
};

class BookManager {

    addBook(price, name, description, image, tags) {

        assert(price, 'price is required');
        assert(name, 'name is required');
        assert(description, 'description is required');
        assert(image, 'image is required');

        const book = createNewBook(price, name, description, image, tags);

        return new Promise((resolve, reject) => {
            bookRepository
                .addBook(book)
                .then(result => resolve(result.id))
                .catch(error => reject(error));
        });
    }


    findBookById(id) {

        assert(id, 'Id is required');

        return new Promise((resolve, reject) => {
            bookRepository
                .findBookById(id)
                .then(book => resolve(mapToBookDto(book)))
                .catch(error => reject(error));
        });
    }
    
    findBooksByName(name) {

        assert(name, 'name is required');

        return new Promise((resolve, reject) => {
            bookRepository
                .findBooksByName(name)
                .then(book => resolve(mapToBookDto(book)))
                .catch(error => reject(error));
        });
    }


    findBooksByTag(tag) {

        assert(tag, 'Tag is required');

        return new Promise((resolve, reject) => {
            bookRepository
                .findBooksByTag(tag)
                .then(books => resolve(books.map(book => mapToBookDto(book))))
                .catch(error => reject(error));
        });
    }


    findBooksByPrice(price) {

        assert(price, 'price is required');

        return new Promise((resolve, reject) => {
            bookRepository
                .findBooksByPrice(price)
                .then(books => resolve(books.map(book => mapToBookDto(book))))
                .catch(error => reject(error));
        });
    }


    listBooks() {
        return new Promise((resolve, reject) => {
            bookRepository
                .listBooks()
                .then(books => resolve(books.map(book => mapToBookDto(book))))
                .catch(error => reject(error));
        });
    }


    removeBook(id) {

        assert(id, 'Id is required');

        return new Promise((resolve, reject) => {
            bookRepository
                .removeNote(id)
                .then(() => resolve())
                .catch(error => reject(error));
        });
    }


    tagBook(id, tags) {

        assert(id, 'Id is required');
        assert(tags, 'Tags are required');

        var exp = new RegExp(/^([\w]+[,]?)*$/);
        assert(exp.test(tags), 'Invalid list of tags specified');

        const uniqueTags = tags ? Array.from(new Set(tags.split(',').map(tag => tag.toLowerCase()))) : [];

        return new Promise((resolve, reject) => {
            bookRepository
                .tagBook(id, uniqueTags)
                .then(() => resolve())
                .catch(error => reject(error));
        });
    }


    updateBook(id, price, name, description, image, tags) {
        assert(id, 'Id is required');
        assert(price, 'price is required');
        assert(name, 'name is required');
        assert(description, 'description is required');
        assert(image, 'image is required');

        const book = createUpdatedBook(price, name, description, image, tags);

        return new Promise((resolve, reject) => {
            bookRepository
                .updateBook(id, book)
                .then(() => resolve())
                .catch(error => reject(error));
        });
    }
}

module.exports = BookManager;