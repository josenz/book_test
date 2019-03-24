'use strict';

const ObjectID = require('mongodb').ObjectID;
const DbConnection = require('./Dbconnection');

const collection = 'books';

const connect = () => new DbConnection('mongodb://127.0.0.1:27017/nextbook');

const filters = {
    id: (id) => {
        return { _id: new ObjectID(id) };
    },
    tag: (tag) => {
        return { tags: { $regex: new RegExp(tag, 'i') } };
    },
    price: (price) => {
        return { tags: { $regex: new RegExp(price, 'i') } };
    },
    name: (name) => {
        return { 'name': { $regex: new RegExp(name, 'i') } };
    },
    description: (description) => {
        return { 'description': { $regex: new RegExp(description, 'i') } };
    },
    image: (image) => {
        return { 'description': { $regex: new RegExp(image, 'i') } };
    }
};

class BookRepository {

    addBook(book) {
        const connection = connect();

        return new Promise((resolve, reject) => {
            connection
                .open()
                .then(() => {
                    connection.Db.collection(collection)
                        .findOne(filters.name(book.name))
                        .then(bookData => {
                            if (bookData) {
                                connection.close();
                                reject(Error('Book already exists'));
                            } else {
                                connection.Db
                                    .collection(collection)
                                    .insertOne(book)
                                    .then(result => {
                                        connection.close();
                                        resolve({ id: result.insertedId });
                                    })
                                    .catch(error => {
                                        connection.close();
                                        reject(error);
                                    });
                            }
                        })
                        .catch(error => {
                            connection.close();
                            reject(error);
                        });
                })
                .catch(error => {
                    reject(error);
                    connection.close();
                });
        });
    }


    findBookById(id) {
        const connection = connect();

        return new Promise((resolve, reject) => {
            connection
                .open()
                .then(() => {
                    connection.Db.collection(collection)
                        .findOne(filters.id(id))
                        .then(book => {
                            resolve(book);
                            connection.close();
                        })
                        .catch(error => {
                            reject(error);
                            connection.close();
                        });
                })
                .catch(error => {
                    reject(error);
                    connection.close();
                });
        });
    }


    findBooksByTag(tag) {
        const connection = connect();

        return new Promise((resolve, reject) => {
            connection
                .open()
                .then(() => {
                    connection.Db.collection(collection)
                        .find(filters.tag(tag))
                        .sort({ updated_date: -1 })
                        .toArray()
                        .then(books => {
                            resolve(books);
                            connection.close();
                        })
                        .catch(error => {
                            reject(error);
                            connection.close();
                        });
                })
                .catch(error => {
                    reject(error);
                    connection.close();
                });
        });
    }


    findBooksByName(name) {
        const connection = connect();

        return new Promise((resolve, reject) => {
            connection
                .open()
                .then(() => {
                    connection.Db.collection(collection)
                        .find(filters.name(name))
                        .sort({ updated_date: -1 })
                        .toArray()
                        .then(books => {
                            resolve(books);
                            connection.close();
                        })
                        .catch(error => {
                            reject(error);
                            connection.close();
                        });
                })
                .catch(error => {
                    reject(error);
                    connection.close();
                });
        });
    }


    listBooks() {
        const connection = connect();

        return new Promise((resolve, reject) => {
            connection
                .open()
                .then(() => {
                    connection.Db.collection(collection)
                        .find()
                        .sort({ updated_date: -1 })
                        .toArray()
                        .then(books => {
                            resolve(books);
                            connection.close();
                        })
                        .catch(error => {
                            reject(error);
                            connection.close();
                        });
                })
                .catch(error => reject(error));
        });
    }


    removeBooks(id) {
        const connection = connect();

        return new Promise((resolve, reject) => {
            connection
                .open()
                .then(() => {
                    connection.Db
                        .collection(collection)
                        .findOneAndDelete(filters.id(id))
                        .then(() => {
                            resolve();
                            connection.close();
                        })
                        .catch(error => {
                            reject(error);
                            connection.close();
                        });
                })
                .catch(error => {
                    resolve(error);
                    connection.close();
                });
        });
    }


    tagBook(id, tags) {
        const connection = connect();

        const update = {
            $addToSet: {
                tags: {
                    $each: tags
                }
            }
        };

        return new Promise((resolve, reject) => {
            connection
                .open()
                .then(() => {
                    connection.Db
                        .collection(collection)
                        .findOneAndUpdate(
                            filters.id(id),
                            update
                        )
                        .then(() => {
                            resolve();
                            connection.close();
                        })
                        .catch(error => {
                            reject(error);
                            connection.close();
                        });
                })
                .catch(error => {
                    reject(error);
                    connection.close();
                });
        });
    }


    updateBook(id, book) {
        const connection = connect();

        return new Promise((resolve, reject) => {
            connection
                .open()
                .then(() => {
                    connection.Db
                        .collection(collection)
                        .update(
                            filters.id(id),
                            {
                                $set: {
                                    price: book.price,
                                    name: book.name,
                                    description: book.description,
                                    image: book.image,
                                    tags: book.tags,
                                    updated_date: book.updated_date
                                }
                            })
                        .then(() => {
                            resolve();
                            connection.close();
                        })
                        .catch(error => {
                            reject(error);
                            connection.close();
                        });
                })
                .catch(error => {
                    resolve(error);
                    connection.close();
                });
        });
    }
}

module.exports = BookRepository;