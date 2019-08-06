import React, { Component } from 'react';
import '../Assets/search.css';
import axios from 'axios';
import Card from './card';

class Search extends Component {
	state = {
		book: null,
		loading: false,
		value: ''
	};

	search = async (val) => {
		this.setState({ loading: true });
		const res = await axios(
			`https://librarymobileapi.herokuapp.com/book/?search=${val}`
		);
		const book = await res.data.result;
		this.setState({ book, loading: false });
	};

	onChangeHandler = async e => {
		this.search(e.target.value);
		this.setState({ value: e.target.value });
	};

	get renderBooks() {
		let book = <Card list={this.props.data} />
		if (this.state.book) {
			book = <Card list={this.state.book} />;
			console.log(this.props.data)
		}
		return book;

	}


	render() {
		return (
			<div>
				<center>
					<input className="search" placeholder="Search Book ..." value={this.state.value}
						onChange={e => this.onChangeHandler(e)} />
					{this.renderBooks}
				</center>
			</div>
		);
	}
}

export default Search;