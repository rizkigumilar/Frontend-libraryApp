import React, {Component} from 'react';
import { Route, Redirect, BrowserRouter as Router } from 'react-router-dom'
import Navbar from '../Components/navbar';
import Detail from '../Components/detailbook';
import Edit from '../Components/edit';
import login from '../Components/login';
import register from '../Components/register';
import Logout from '../Components/logout';
import History from '../Components/history';
import Member from '../Components/member';
import profile from '../Components/profile';
import Search from '../Components/cari';


class Routing extends Component {
  render () {
    return (
      <div>
      <Router>
      <Redirect to="/book" />
      <Route exact path={"/book"} component={Navbar} />
      <Route exact path={"/book"} component={Search} />
      <Route path={"/book/:idBook"} component={Detail} />
      <Route exact path={"/user/login"} component={login} />
      <Route exact path={"/user/logout"} component={Logout} />
      <Route exact path={"/user/register"} component={register} />
      <Route exact path={"/user/history"} component={History} />
      <Route exact path={`/profile/${localStorage.idNum}`} component={profile} />
      <Route exact path={"/user/member"} component={Member} />
      <Route exact path={"/book/:idBook/edit"} component={Edit} />
      </Router>
      </div>
    );
  }
}

export default Routing;
