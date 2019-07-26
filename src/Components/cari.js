import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../Assets/cari.css';
import Search from './search';
import { getBook } from '../Publics/redux/actions/book';

class Cari extends Component {
    state = {
        book: [],
    };
    componentDidMount = async () => {
        await this.props.dispatch(getBook());
        this.setState({
            book: this.props.book,
        });
    };

    render() {
        return (
            <div className='atas'>
                <div>
                    <Search data={this.state.book.bookList} />
                </div>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        book: state.book,
    };
};

export default connect(mapStateToProps)(Cari);