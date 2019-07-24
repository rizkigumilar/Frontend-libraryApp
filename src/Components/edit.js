import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Col, Input } from 'reactstrap';
import '../Assets/button.css';
import { getBookid } from '../Publics/redux/actions/book';
import { editBook } from '../Publics/redux/actions/book';
//import Flex from './'
class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: true,
            books: [],
            tmp: []
        };

        this.toggle = this.toggle.bind(this);
    }
    componentDidMount = async () => {
        await this.props.dispatch(getBookid(this.props.match.params.idBook));
        this.setState({
            books: this.props.book
        });
    };
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    changeHandle = (e) => {
        const name = e.currentTarget.name
        const val = e.currentTarget.value
        this.state.books[name] = val
        this.setState({ books: this.state.books })

    }
    render() {
        const editbooks = () => {
            let idCat = '';
            console.log('masuk')
            switch (this.state.books.category) {
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
            this.state.tmp.push({
                name: this.state.books.name,
                writer: this.state.books.writer,
                description: this.state.books.description,
                location: this.state.books.location,
                image: this.state.books.image,
                idCat,
            });
            edit()
            this.setState((prevState) => ({
                modal: !prevState.modal
            }));
            console.log(this.state.tmp);
        };
        let edit = async () => {
            await this.props.dispatch(editBook((this.state.tmp[0]), this.state.books.idBook));
        };
        const { books } = this.state;
        const list = books.bookList;
        list &&
            list.length > 0 &&
            list.map((item) => {
                return this.setState({
                    books: item
                });
            });

        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="{this.props.className} modal-lg">
                    <ModalHeader toggle={this.toggle}>
                        <b>Book Data</b>
                    </ModalHeader>
                    <ModalBody>
                        <Form >
                            <FormGroup row >
                                <Label sm={3} size="lg">
                                    Title
								</Label>
                                <Col sm={9}>
                                    <Input
                                        type="text"
                                        name="name"
                                        id="title"
                                        placeholder="Title..."
                                        bsSize="lg"
                                        value={this.state.books.name}
                                        onChange={this.changeHandle}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row >
                                <Label sm={3} size="lg">
                                    Author
								</Label>
                                <Col sm={9}>
                                    <Input
                                        type="text"
                                        name="writer"
                                        id="title"
                                        placeholder="Author..."
                                        bsSize="lg"
                                        value={this.state.books.writer}
                                        onChange={this.changeHandle}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3} size="lg">
                                    Category
								</Label>
                                <Col sm={9}>
                                    <select value={this.state.books.category}
                                        onChange={this.changeHandle}>
                                        <option value='Fiksi'>Fiksi</option>
                                        <option value='Filsafat'>Filsafat</option>
                                        <option value='Teknologi'>Teknologi</option>
                                        <option value='Sosial'>Sosial</option>
                                    </select>
                                </Col>
                            </FormGroup>
                            <FormGroup row >
                                <Label sm={3} size="lg">
                                    Description
								</Label>
                                <Col sm={9}>
                                    <Input
                                        type="textarea"
                                        name="description"
                                        id="title"
                                        placeholder="Desc..."
                                        bsSize="lg"
                                        value={this.state.books.description}
                                        onChange={this.changeHandle}
                                    />
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <a href={`/book/${this.state.books.idBook}`}><button class="buttonSave" onClick={editbooks.bind(this)}>
                            SAVE
						</button></a>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        book: state.book
    };
};
export default connect(mapStateToProps)(Edit);