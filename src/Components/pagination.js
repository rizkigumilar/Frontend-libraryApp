import React, { Component } from 'react';

import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import { getBooks } from '../Publics/redux/actions/book';



class Paging extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
        };
    }


    handlePageChange = async (pageNumber) => {
        await this.props.dispatch(getBooks(pageNumber))
            .then((response) => {
            }
            )
    }
    render() {


        return (
            <div className="pagination-head">
                <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={12}
                    totalItemsCount={this.props.jumlah}
                    pageRangeDisplayed={5}
                    itemClass="page-item"
                    linkClass="page-link"
                    onChange={this.handlePageChange.bind(this)}
                />

            </div>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        bookshow: state.books.bookshow,
        jumlah: state.books.jumlah
    }
}

export default connect(mapStateToProps)(Paging)