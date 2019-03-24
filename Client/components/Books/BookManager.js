import React, { Component } from 'react';
import Modal from 'react-modal';
import AddBookForm from './AddBookForm';
import EditBookForm from './EditBookForm';
import BookTable from './BookTable';
import ControlPanel from './ControlPanel';
const BookService = require('../../services/book-service');

class BookManager extends Component {
    constructor(props) {
        super(props);

        this.state = {
            books: [],
            selectedBook: null,
            isAddBookModalOpen: false,
            isEditBookModalOpen: false
        };


        this.handleOnAddBook = this.handleOnAddBook.bind(this);
        this.handleOnEditBook = this.handleOnEditBook.bind(this);
        this.handleOnDeleteBook = this.handleOnDeleteBook.bind(this);
        this.handleOnFindBooks = this.handleOnFindBooks.bind(this);

        this.handleOpenAddBookModal = this.handleOpenAddBookModal.bind(this);
        this.handleOnCloseAddBookModal = this.handleOnCloseAddBookModal.bind(this);

        this.handleOpenEditBookModal = this.handleOpenEditBookModal.bind(this);
        this.handleOnCloseEditBookModal = this.handleOnCloseEditBookModal.bind(this);
    }


    componentDidMount() {
        this.listBooks();
    }

    
    listBooks() {
        BookService
            .listBooks()
            .then(books => {
                this.setState({books});
                return;
            })
            .catch(error => {
                console.log(error);
                return;
            });
    }


    handleOnDeleteBook(bookId) {

        if (bookId < 1) {
            throw Error('Cannot remove book. Invalid book id specified');
        }

        const confirmation = confirm('Are you sure you wish to remove book?');

        if (confirmation) {
            BookService
                .removeBook(bookId)
                .then(() => {
                    BookService
                        .listBooks()
                        .then(books => {
                            this.setState({books});
                            return;
                        })
                        .catch(error => {
                            console.log(error);
                            return;
                        });
                })
                .catch(error => {
                    console.log(error);
                    return;
                });
        }
    }


    handleOnFindBooks(name) {

        if (!name || name === '') {
            this.listBooks();
            return;
        }

        BookService
            .findBooksByName(name)
            .then(books => {
                if (!books) {
                    books = [];
                }
                this.setState({books});
                return;
            })
            .catch(error => {
                console.log(error);
                return;
            });
    }


    handleOnAddBook(book) {

        this.setState({isAddBookModalOpen: false});

        const { price, name, description, image, tags } = book;

        if (!price || price.length === 0) {
            throw Error('Price is required');
        }

        if (!name || name.length === 0) {
            throw Error('Name is required');
        }

        if (!description || description.length === 0) {
            throw Error('Description is required');
        }
        if (!image || image.length === 0) {
            throw Error('Image is required');
        }

        if (!Array.isArray(tags)) {
            throw Error('Tags must be an array');
        }

        BookService
            .addBook(price, name, description, image, tags)
            .then(newBook => {
                BookService
                    .listBooks()
                    .then(books => {
                        books.forEach(n => n.id === newBook.id ? n.isNew = 'true' : n.isNew = undefined);
                        this.setState({books});
                    })
                    .catch(error => console.log(error));
            })
            .catch(error => {
                console.log(error);
            });
    }


    handleOnCloseAddBookModal() {
        this.setState({isAddBookModalOpen: false});
    }


    handleOpenAddBookModal() {
        this.setState({isAddBookModalOpen: true});
    }


    handleOnCloseEditBookModal() {
        this.setState({isEditBookModalOpen: false});
    }


    handleOpenEditBookModal(bookId) {

        if (!bookId || bookId < 1) {
            throw Error('Cannot edit book. Invalid book id specified.');
        }

        BookService
            .findBook(bookId)
            .then(book => {
                this.setState({selectedBook: book});
                this.setState({isEditBookModalOpen: true});
                return;
            })
            .catch(error => {
                console.log(error);
                return;
            });
    }


    handleOnEditBook(book) {
        this.setState({isEditBookModalOpen: false});

        const { price, name, description, image, tags } = book;

        if (!price || price.length === 0) {
            throw Error('Price is required');
        }

        if (!name || name.length === 0) {
            throw Error('Name is required');
        }

        if (!description || description.length === 0) {
            throw Error('Description is required');
        }

        if (!image || image.length === 0) {
            throw Error('Image is required');
        }

        if (!Array.isArray(tags)) {
            throw Error('Tags must be an array');
        }

        BookService
            .updateBook(book)
            .then(() => {
                BookService
                    .listBooks()
                    .then(books => {
                        books.forEach(n => n.id === book.id ? n.isNew = 'true' : n.isNew = undefined);
                        this.setState({books});
                    })
                    .catch(error => console.log(error));
            })
            .catch(error => {
                console.log(error);
            });
    }


    render() {
        return (
            <div>
                <Modal isOpen={this.state.isAddBookModalOpen} onRequestClose={this.handleOnCloseAddBookModal}>
                    <AddBookForm onSaveBook={this.handleOnAddBook} onCloseModal={this.handleOnCloseAddBookModal} />
                </Modal>
                <Modal isOpen={this.state.isEditBookModalOpen} onRequestClose={this.handleOnCloseEditBookModal}>
                    <EditBookForm onSaveBook={this.handleOnEditBook} onCloseModal={this.handleOnCloseEditBookModal} book={this.state.selectedBook} />
                </Modal>
                <div className="mb-3">
                    <ControlPanel openAddBookModal={this.handleOpenAddBookModal} onFindBooks={this.handleOnFindBooks} />
                </div>
                <BookTable books={this.state.books} onDeleteBook={this.handleOnDeleteBook} onOpenEditBookModal={this.handleOpenEditBookModal} />
            </div>
        );
    }
}

export default BookManager;