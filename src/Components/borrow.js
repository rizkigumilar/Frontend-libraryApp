import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter
} from 'reactstrap';
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

	render() {
		const borrowAdd = () => {
			this.state.borrow.push({
				idNum: this.state.idNum,
                idBook: this.state.id
				
			});
			add()
			this.setState((prevState) => ({
				modal: !prevState.modal
			}));
			console.log(this.state.book);
		};
		let add = async () => {
			await this.props.dispatch(postBorrow(this.state.borrow[0]));				
		};
		return (
			<div>
				<button class="buttonB" onClick={this.toggle}>
					BORROW
				</button>
				<Modal isOpen={this.state.modal} toggle={this.toggle} className="{this.props.className} modal-lg">
					<ModalHeader toggle={this.toggle}>
						<b>Add Data</b>
					</ModalHeader>
					<ModalBody>
						<h2>No KTP : {localStorage.idNum}</h2>
					</ModalBody>
					<ModalFooter>
						<a href={"/book"}><button class="buttonSave" onClick={borrowAdd.bind(this)}>
							SAVE
						</button></a>
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
export default connect(mapStateToProps) (Borrow);
