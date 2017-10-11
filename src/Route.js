import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom';
import App from './component/app';
import Admin from './component/admin';
import Login from './component/Login';
// import User from './component/user';


class RouterS extends Component {

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/app" component={App} />
            <Route path="/home" exact component={Admin} />
            <Route path="/login" exact component={Login} />

            <Redirect from="/" to="/app" />
          </Switch>
        </div>
      </Router>
    );
  }
}


export default RouterS;
