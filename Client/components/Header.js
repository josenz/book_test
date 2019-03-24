import React from 'react';

const Header = () => (
    <header className="fixed-top">
        <div className="collapse bg-dark" id="navbarHeader">
            <div className="container">
                <div className="row">
                    <div className="col-sm-8 col-md-7 py-4">
                        <h4 className="text-white">About</h4>
                        <p className="text-muted">Learn in the next generation way, where you never ever again will feel bored for reading a book!.</p>
                    </div>
                    <div className="col-sm-4 offset-md-1 py-4">
                        <h4 className="text-white">Contact</h4>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-white">Follow on Twitter</a></li>
                            <li><a href="#" className="text-white">Like on Facebook</a></li>
                            <li><a href="#" className="text-white">Email me</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div className="navbar navbar-dark bg-dark shadow-sm">
            <div className="container d-flex justify-content-between">
                <a href='/' className="navbar-brand d-flex align-items-center">
                    <i className="fas fa-book-open"></i>&nbsp;
                    <strong>Next Book</strong>
                </a>

                <div className="dropdown dropdown-bubble ml-auto">
                    <a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="navbar-brand ml-auto ">
                        <i className="far fa-user" style={{ color: '#80e5ff' }}></i>
                    </a>
                    <span className="label" style={{ fontSize: 1 + 'em', textTransform: 'capitalize' }}>  </span>

                    <span className="caret"></span>

                    <ul className="dropdown-menu" aria-labelledby="dLabel">
                        <li><a href="#" className="button"><i className="fas fa-cogs"></i> &nbsp; Settings</a></li>
                        <li><a href="#" className="button"><i className="fas fa-user-alt"></i> &nbsp; Profile</a></li>
                    </ul>

                </div>


                <a href="/logout" className="navbar-brand" style={{ fontSize: .85 + 'em' }}> &nbsp; | &nbsp; Logout </a>

                <a href="/login" className="navbar-brand ml-auto" style={{ fontSize: .9 + 'em' }}> Login </a>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHeader"
                    aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            </div>
        </div>
    </header>
);

export default Header;