import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';
import { login } from '../Publics/redux/actions/user';
import '../Assets/login.css'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
    };
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
      }))}
      let add = async () => {
      await this.props.dispatch(login(this.state.user[0]))
     .then (()=>{
      swal({
          title: "Login",
          text: "Login Success",
          icon: "success",
          button: "OK"
      }).then(() => {
          window.location.href = '/book';
        })
  })
  .catch(()=>{
      swal({
          title: "Login Failed",
          text: "Email Or Password Wrong !!!",
          icon: "warning",
          buttons: "OK"
      })
  })
}

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
          <Button class="buttonSave" onClick={userAdd.bind(this)} style={{backgroundColor:'rgb(43, 195, 206)'}}>Sign In</Button>
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