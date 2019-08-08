import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter
} from 'reactstrap';
import swal from 'sweetalert'
import '../Assets/button.css';
import { postBorrow } from '../Publics/redux/actions/borrow';

class Borrow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.id,
			idNum: localStorage.idNum,
			modal: false,
			borrow: [],
		};

		this.toggle = this.toggle.bind(this);
		this.toggleDrop = this.toggleDrop.bind(this);
	}

	toggle() {
		this.setState({
			modal: !this.state.modal
		});
	}
	toggleDrop() {
		this.setState((prevState) => ({
			dropdownOpen: !prevState.dropdownOpen
		}));
	}
	borrowAdd = () => {
		this.state.borrow.push({
			idNum: this.state.idNum,
			idBook: this.state.id

		});
		this.add()
		this.setState((prevState) => ({
			modal: !prevState.modal
		}));
		console.log(this.state.book);
	};
	add = async () => {
		await this.props.dispatch(postBorrow(this.state.borrow[0]))
			.then(() => {
				swal({
					title: "Borrow",
					text: "Borrow Success",
					icon: "success",
					button: "OK"
				}).then(() => {
					window.location.href = '/book';
				})
			})
	};

	render() {

		var today = new Date();
		var dd = String(today.getDate() + 3).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0');
		var yyyy = today.getFullYear();

		const date = dd + ' - ' + mm + ' - ' + yyyy;
		return (
			<div>
				<button class="buttonB" onClick={this.toggle}>
					BORROW
				</button>
				<Modal isOpen={this.state.modal} toggle={this.toggle} className="{this.props.className} modal-lg">
					<ModalHeader toggle={this.toggle}>
						<b>Borrow </b>
					</ModalHeader>
					<ModalBody>
						<h2>Name : {localStorage.name}</h2>
						<h2>Id Number : {localStorage.idNum}</h2>
						<h2>Return Date : {date} </h2>
					</ModalBody>
					<ModalFooter>
						<button class="buttonSave" onClick={this.borrowAdd.bind(this)}>
							CONFIRM
						</button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		borrow: state.borrow
	};
};
export default connect(mapStateToProps)(Borrow);
