import React from 'react';
import PropTypes from 'prop-types';

const BookTable = (props) => {
    const books = props.books;

    const bookRows = books.map(book => {

        let classes = `small ${!!book.isNew ? 'table-success' : ''}`;

        return (
            <tr key={book.id.toString()} className={classes}>
                <td className="align-middle" style={{ width: '80px' }}>
                    <div className="d-flex flex-row">
                        <a data-toggle="tooltip" data-placement="top" title="Edit Book" className="p-2" onClick={() => props.onOpenEditBookModal(book.id)}>
                            <i className="fa fa-pencil fa-lg text-primary"></i>
                        </a>
                        <a data-toggle="tooltip" data-placement="top" name="Delete Book" className="p-2" onClick={() => props.onDeleteBook(book.id)}>
                            <i className="fa fa-trash fa-lg text-danger"></i>
                        </a>
                    </div>
                </td>
                <td className="align-middle">{book.price}</td>
                <td className="align-middle">
                    <span className="d-inline-block text-truncate" style={{ maxWidth: '200px' }}>
                        {book.name}
                    </span>
                </td>
                <td className="align-middle">
                    <span className="d-inline-block text-truncate" style={{ maxWidth: '200px' }}>
                        {book.description}
                    </span>
                </td>
                <td className="align-middle">
                    <span className="d-inline-block text-truncate" style={{ maxWidth: '200px' }}>
                        {book.image}
                    </span>
                </td>
                <td className="align-middle">{`${new Date(book.updatedDate).toISOString().slice(0, 10)} ${new Date(book.updatedDate).toISOString().slice(11, 16)}`}</td>
            </tr>
        );
    });

    return (
        <div>
            <table className="table table-bordered table-striped table-hover">
                <thead>
                    <tr>
                        <th></th>
                        <th className="align-middle text-center">Price</th>
                        <th className="align-middle text-center">Name</th>
                        <th className="align-middle text-center">Description</th>
                        <th className="align-middle text-center">Image</th>
                        <th className="align-middle text-center">Updated Date</th>
                    </tr>
                </thead>
                <tbody>
                    {bookRows}
                </tbody>
            </table>
        </div>
    );
};

BookTable.propTypes = {
    books: PropTypes.array,
    onDeleteBook: PropTypes.func,
    onOpenEditBookModal: PropTypes.func
};

export default BookTable;