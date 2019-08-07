import React, { Component } from 'react';
import '../Assets/navbar.css';
import { Link } from 'react-router-dom';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


class Navbar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <div className="titleBar">
        <div style={{ paddingLeft: '100px', paddingTop: '10px' }}>
          <span style={{ color: 'white', fontSize: '30pt', fontWeight: 'bolder' }}>LIBRARY</span>

          {localStorage.name != null ?
            (<ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} style={{ float: 'right', marginRight: '100px', marginTop: '8px' }}>
              <DropdownToggle style={{ backgroundColor: 'rgb(43, 195, 206)', border: 'none', fontWeight: 'bold', fontSize: '20pt' }}>
                Hi, {localStorage.name}
              </DropdownToggle>
              <DropdownMenu>
                <Link to="/user/logout"><DropdownItem>Logout</DropdownItem></Link>
                {localStorage.status === 0 ?
                  (<Link to="/user/member"><DropdownItem>Member List</DropdownItem></Link>) : ('')}
                {localStorage.status === 0 ?
                  (<Link to="/user/history"><DropdownItem>Loan History List</DropdownItem></Link>) : (<Link to={`/profile/${localStorage.idNum}`}><DropdownItem>profile</DropdownItem></Link>)}
              </DropdownMenu>
            </ButtonDropdown>) :
            (<Link to="/user/login"><span style={{ color: 'white', fontSize: '20pt', fontWeight: 'bolder', float: 'right', marginRight: '100px', marginTop: '10px' }}>LOGIN</span></Link>)
          }
        </div>
      </div>
    );
  }
}

export default Navbar;
