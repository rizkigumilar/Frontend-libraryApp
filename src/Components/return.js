import React, { Component } from 'react';
import { connect } from 'react-redux'
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
import { getBorrow, updateBorrow } from '../Publics/redux/actions/borrow';

class Return extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
            borrow: [],
            id: this.props.idBook
		};

		this.toggle = this.toggle.bind(this);
    }
    
    componentDidMount = async() => {
        await this.props.dispatch(getBorrow(this.props.idBook));
        this.setState({
            borrow: this.props.borrow
        });
        const list = this.state.borrow.borrowList;
        list &&
        list.length > 0 &&
        list.map(item => {
            return this.setState({
                borrow: this.convert(item.MaksPinjam),
                id : item.idBook
            });
        });
    }

	toggle() {
		this.setState({
			modal: !this.state.modal
		});
	}
    
    changeHandle = (e) => {
        const name = e.currentTarget.name;
        let val = e.currentTarget.value;
        this.state.borrow[name] = val;
        this.setState({borrow: this.state.borrow})
    };

    convert = (date) => {
        let result = 0;
		let data = Date.parse(date);
		let newDate = new Date(data);
		let day = newDate.getDate();
        let month = newDate.getMonth();
        let newData = new Date();
		let newDay = newData.getDate();
        let newMonth = newData.getMonth();
        if (month === newMonth){
            if(day >= newDay){
                result = 0
            }
            else{
                result = ((newDay - day)*2000)
            }
		}
        return result;
    }

	render() {
		let up = async () => {
            await this.props.dispatch(updateBorrow(this.props.id ,this.state.borrow))
		};
		console.log(this.props.borrow)
		return (
			<div>
				<button class="buttonB" onClick={this.toggle}>
					Return
				</button>
				<Modal isOpen={this.state.modal} toggle={this.toggle} className="{this.props.className} modal-lg">
					<ModalHeader toggle={this.toggle}>
						<b>Data</b>
					</ModalHeader>
					<ModalBody>
						<Form>
							<FormGroup row>
								<Label sm={3} size="lg">
									Penalty
								</Label>
								<Col sm={9}>
									<Input
										type="text"
										name="Penalty"
										id="title"
										placeholder="Penalty..."
										bsSize="lg"
										value={this.state.borrow}
                                        onChange={this.changeHandle}
									/>
								</Col>
							</FormGroup>
						</Form>
					</ModalBody>
					<ModalFooter>
						<a href="/book"><button class="buttonSave" onClick={up.bind(this)}>
							OKAY
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
export default connect(mapStateToProps) (Return);
