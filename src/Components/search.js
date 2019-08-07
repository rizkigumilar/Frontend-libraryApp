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

		if (this.state.value != '') {
			book = <Card list={this.state.book} />;
		} else {
			book = <Card list={this.props.data} />
		}
		return book;

	}


	render() {
		console.log(this.props.data)
		const sum = Math.ceil(this.props.sumPage / 8)
		console.log(sum)
		return (
			<div>
				<center>
					<input className="search" placeholder="Search Book ..." value={this.state.value}
						onChange={e => this.onChangeHandler(e)} />
					{this.renderBooks}
					<div className='button-next'>
						{this.state.page == 1 ?
							(<button
								style={{
									color: 'white',
									backgroundColor: 'rgb(43, 195, 206)',
									marginRight: '10px',
									marginBottom: '30px',
									width: '100px'
								}}
								onClick={this.props.prev}
								disabled>Prev
                        </button>) :
							(<button
								style={{
									color: 'white',
									backgroundColor: 'rgb(43, 195, 206)',
									marginRight: '10px',
									marginBottom: '30px',
									width: '100px'
								}}
								onClick={this.props.prev}>Prev</button>)}

						{this.state.page == sum ?
							(<button
								style={{
									color: 'white',
									backgroundColor: 'rgb(43, 195, 206)',
									marginRight: '10px',
									marginBottom: '30px',
									width: '100px'
								}}
								onClick={this.props.next}
								disabled>Next
                            </button>) :
							(<button
								style={{
									color: 'white',
									backgroundColor: 'rgb(43, 195, 206)',
									marginRight: '10px',
									marginBottom: '30px',
									width: '100px'
								}}
								onClick={this.props.next}>Next
                            </button>)}
					</div>
				</center>
			</div>
		);
	}
}

export default Search;