import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Logout extends Component {
    constructor(props) {
        super(props);
        localStorage.removeItem('jwToken')
        localStorage.removeItem('userid')
        localStorage.removeItem('name')
    }
    render() {

        return (
            <div>
                <Redirect to="/book" />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        book: state.book
    };
};
export default connect(mapStateToProps)(Logout);