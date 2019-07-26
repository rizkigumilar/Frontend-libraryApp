import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { getUsers,deleteMember } from '../Publics/redux/actions/user';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

class Member extends Component {
  state = {
    user: [],
  };
  componentDidMount = async () => {
    await this.props.dispatch(getUsers());
    this.setState({
      user: this.props.user,
    });
  };

  deleteUser = async (userid) => {
    await this.props.dispatch(deleteMember(userid));
    console.log(userid)
  };

  render() {
    const { user } = this.state;
    const list = user.userList;
    console.log(list);
    return (
      <div style={{ maxWidth: '100%' }}>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
        <MaterialTable
          columns={[
            { title: 'Name', field: 'name' },
            { title: 'Id Number', field: 'idNumber' },
            { title: 'Email', field: 'email' },
            { title: 'Action', field: 'Action' }

          ]}
          data={list &&
            list.length > 0 &&
            list.map((item, index) =>{
            return(
              {name: item.fullname, idNumber: item.idNum, email: item.email, Action:  <button onClick={() => this.deleteUser(item.userid)} style={{backgroundColor:'red', borderRadius:'8px',color:'white'}}>Delete User</button>}
            ) 
           })}
          title="Member List"
        />
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Member);