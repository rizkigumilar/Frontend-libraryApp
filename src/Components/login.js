import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';
import { login } from '../Publics/redux/actions/user';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const userAdd = () => {
      this.state.user.push({
        email:this.state.email,
        password: this.state.password
      });
      add()
      this.setState((prevState) => ({
        modal: !prevState.modal
      }));
      console.log(this.state.book);
    };
    let add = async () => {
      await this.props.dispatch(login(this.state.user[0]));
    };
    return (
      <Container className="box">
        <h2>Sign In</h2>
        <Form className="form">
          <Col>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                onChange={(e) => this.setState({ email: e.target.value })}
                id="exampleEmail"
                placeholder="myemail@email.com"
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                onChange={(e) => this.setState({ password: e.target.value })}
                id="examplePassword"
                placeholder="*******"
              />
            </FormGroup>
          </Col>
          <Button class="buttonSave" onClick={userAdd.bind(this)} href="/book" style={{backgroundColor:'rgb(43, 195, 206)'}}>Sign In</Button>
          <br/>
          <span>Not register yet, <Link to="/user/register">register now</Link></span>
        </Form>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
      book: state.book
  };
};
export default connect(mapStateToProps) (Login);