import React, { Component } from 'react';
import '../Assets/search.css';
import {connect} from 'react-redux';

class Search extends Component {

	

	render() {
		
		return (
			<div>
				<center>
					<input class="search"  name="search" id="search" placeholder="Search Book ..." onChange={this.search} />
				</center>
			</div>
		);
	}
}

const mapStateToProps = state => {
    return {
        book: state.book
    };
};
export default connect(mapStateToProps) (Search);