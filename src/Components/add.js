import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Form,
	FormGroup,
	Label,
	Col,
	Input
} from 'reactstrap';
import '../Assets/button.css';
import { postBook } from '../Publics/redux/actions/book';

class Add extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			book: [],
			dropdownOpen: false
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
	onChangeFile = (e) => {
		console.log(e.target.files[0])
		this.setState({
			file: e.target.files[0],
		})
	}

	render() {
		const bookAdd = () => {
			let idCat = '';
			switch (this.state.category) {
				case 'Sosial':
					idCat = 4;
					break;
				case 'Tekno':
					idCat = 3;
					break;
				case 'Fiksi':
					idCat = 2;
					break;
				default:
					idCat = 1;
			}
			const dataFile = new FormData()
			dataFile.append('image', this.state.file)
			dataFile.append('name', this.state.name)
			dataFile.append('writer', this.state.writer)
			dataFile.append('location', this.state.location)
			dataFile.append('description', this.state.description)
			dataFile.append('idCat', idCat)
			// this.state.book.push({
			// 	name: this.state.name,
			// 	writer: this.state.writer,
			//     description: this.state.description,
			//     idCat,
			//     location: this.state.location,
			// 	image: this.state.image,

			// });
			add(dataFile)
			this.setState((prevState) => ({
				modal: !prevState.modal
			}));
			console.log(this.state.book);
		};
		let add = async (data) => {
			await this.props.dispatch(postBook(data)).then(() => {
				swal({
					title: "Succes",
					text: "Add Success !!",
					icon: "success",
					button: "OK"
				}).then(() => {
					window.location.href = '/book';
				})
			})
				.catch(() => {
					swal({
						title: "Add Failed",
						text: "Book Is Avalaible",
						icon: "warning",
						buttons: "OK"
					}).then(() => {
						window.location.href = '/book';
					})
				})
		};
		return (
			<div>
				<button class="button" onClick={this.toggle}>
					ADD BOOK
				</button>
				<Modal isOpen={this.state.modal} toggle={this.toggle} className="{this.props.className} modal-lg">
					<ModalHeader toggle={this.toggle}>
						<b>Add Data</b>
					</ModalHeader>
					<ModalBody>
						<Form>
							<FormGroup row>
								<Label sm={3} size="lg">
									Title
								</Label>
								<Col sm={9}>
									<Input
										type="text"
										name="title"
										onChange={(e) => this.setState({ name: e.target.value })}
										id="title"
										placeholder="Title..."
										bsSize="lg"
									/>
								</Col>
							</FormGroup>
							<FormGroup row>
								<Label sm={3} size="lg">
									Author
								</Label>
								<Col sm={9}>
									<Input
										type="text"
										name="title"
										onChange={(e) => this.setState({ writer: e.target.value })}
										id="title"
										placeholder="Author..."
										bsSize="lg"
									/>
								</Col>
							</FormGroup>
							<FormGroup row>
								<Label sm={3} size="lg">
									Image
								</Label>
								<Col sm={9}>
									<Input
										type="file"
										name="title"
										onChange={this.onChangeFile}
										id="title"
										placeholder="Image..."
										bsSize="lg"
									/>
								</Col>
							</FormGroup>
							<FormGroup row>
								<Label sm={3} size="lg">
									Category
								</Label>
								<Col sm={9}>
									<Input
										type="text"
										name="title"
										onChange={(e) => this.setState({ category: e.target.value })}
										id="title"
										placeholder="Category..."
										bsSize="lg"
									/>
								</Col>
							</FormGroup>
							<FormGroup row>
								<Label sm={3} size="lg">
									Location
								</Label>
								<Col sm={9}>
									<Input
										type="text"
										name="title"
										onChange={(e) => this.setState({ location: e.target.value })}
										id="title"
										placeholder="Location..."
										bsSize="lg"
									/>
								</Col>
							</FormGroup>
							<FormGroup row>
								<Label sm={3} size="lg">
									Description
								</Label>
								<Col sm={9}>
									<Input
										type="textarea"
										name="desc"
										onChange={(e) => this.setState({ description: e.target.value })}
										id="desc"
										placeholder="Desciption..."
									/>
								</Col>
							</FormGroup>
						</Form>
					</ModalBody>
					<ModalFooter>
						<button class="buttonSave" onClick={bookAdd.bind(this)}>
							SAVE
						</button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		book: state.book
	};
};
export default connect(mapStateToProps)(Add);
