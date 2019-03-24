import React, { Component } from 'react';
import Header from './Header';
import BookManager from './Books/BookManager';



export default class App extends Component {
    render() {
        return (
            <div>
                <Header />

                <main role="main">

                    <section className="jumbotron text-center">
                        <div className="container">
                            <h1 className="jumbotron-heading">Next Book</h1>
                            <p className="lead text-muted">Welcome to the future, where textbooks never are boring.</p>
                        </div>
                    </section>
                    
                </main>
                <div className="container mt-5">
                    <BookManager />
                </div>
            </div>

        );
    }
}

