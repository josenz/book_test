'use strict';


// package references


import * as axios from 'axios';


// db options


const baseApiUrl = 'http://localhost:8000/api';


// add book

const addBook = (price, name, description, image, tags = []) => {

    return new Promise((resolve, reject) => {
        axios
            .post(`${baseApiUrl}/books`, {
                'price': price,
                'name': name,
                'description': description,
                'image': image,
                'tags': tags.join()
            })
            .then((result) => {
                resolve(result.data);
            })
            .catch(error => {
                console.log(error);
                reject(error.message);
            });

    });

};


// find books


const findBook = (id) => {

    return new Promise((resolve, reject) => {
        axios
            .get(`${baseApiUrl}/books/${id}`)
            .then(response => {
                resolve(response.data);
                return;
            })
            .catch(error => {
                reject(error.message);
                return;
            });
    });

};


const findBooksByName = (name) => {

    return new Promise((resolve, reject) => {
        axios
            .get(`${baseApiUrl}/books?name=${name}`)
            .then(response => {
                resolve(response.data);
                return;
            })
            .catch(error => {
                reject(error.message);
                return;
            });
    });

};

const listBooks = () => {

    return new Promise((resolve, reject) => {
        axios
            .get(`${baseApiUrl}/books`)
            .then(response => {
                resolve(response.data);
                return;
            })
            .catch(error => {
                reject(error.message);
                return;
            });
    });

};


// remove book


const removeBook = (id) => {

    return new Promise((resolve, reject) => {
        axios
            .delete(`${baseApiUrl}/books/${id}`)
            .then(() => {
                resolve();
                return;
            })
            .catch(error => {
                reject(error.message);
                return;
            });
    });

};


// update book


const updateBook = (book) => {
    return new Promise((resolve, reject) => {
        axios
            .put(`${baseApiUrl}/books`, {book})
            .then(() => {
                resolve();
                return;
            })
            .catch(error => {
                reject(error.message);
                return;
            });
    });

};


// exports


module.exports = {
    'addBook': addBook,
    'findBook': findBook,
    'findBooksByName': findBooksByName,
    'listBooks': listBooks,
    'removeBook': removeBook,
    'updateBook': updateBook
};