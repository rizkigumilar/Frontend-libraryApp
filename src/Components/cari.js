import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../Assets/cari.css';
import Search from './search';
import { getBook } from '../Publics/redux/actions/book';
import { getPagination } from '../Publics/redux/actions/page';


class Cari extends Component {
    state = {
        book: [],
        page: [],
        numPage: 1,
        sumPage: ''

    };
    componentDidMount = () => {
        this.makeRequest()
    }
    makeRequest = async () => {
        const numPage = this.state.numPage;
        await this.props.dispatch(getPagination(numPage));
        this.setState({
            page: this.props.page,
        });
        await this.props.dispatch(getBook());
        this.setState({
            sumPage: this.props.book.bookList.length
        });
    };

    next = () => {
        this.setState({
            numPage: this.state.numPage + 1,
        }, () => {
            this.makeRequest()
        })
    }
    prev = () => {
        this.setState({
            numPage: this.state.numPage - 1,
        }, () => {
            this.makeRequest()
        })
    }


    render() {
        console.log(this.state.sumPage)
        console.log(this.state.page)
        console.log(this.state.book)

        return (
            <div className='atas'>
                <div>
                    <Search data={this.state.page.pageList} next={this.next} prev={this.prev} sumPage={this.state.sumPage} numPage={this.state.numPage} />
                </div>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        page: state.page,
        book: state.book
    };
};

export default connect(mapStateToProps)(Cari);