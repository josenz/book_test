import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ControlPanel extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: ''
        };

        this.onSearchNameChanged = this.onSearchNameChanged.bind(this);
    }

    onSearchNameChanged(event) {
        const name = event.target.value;
        this.setState({name});
    }

    render() {
        return (
            <div>
                <div className="input-group input-group-lg">
                    <span className="input-group-btn">
                        <button className="btn btn-primary" type="button" onClick={this.props.openAddBookModal}>
                            <i className="fa fa-plus"></i>
                        </button>
                    </span>
                    <input type="text" className="form-control" placeholder="Search for note by name ..." value={this.state.name} onChange={this.onSearchNameChanged} />
                    <span className="input-group-btn">
                        <button className="btn btn-primary" type="button" onClick={() => this.props.onFindBooks(this.state.name)} >
                            <i className="fa fa-search"></i>
                        </button>
                    </span>
                </div>
            </div>
        );
    }
}

ControlPanel.propTypes = {
    openAddBookModal: PropTypes.func,
    onFindBooks: PropTypes.func
};

export default ControlPanel;