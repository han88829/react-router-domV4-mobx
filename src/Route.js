import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import App from './component/app';
import Admin from './component/admin';
// import User from './component/user';


class RouterS extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/app" component={App} />
            <Route path="/home" exact component={Admin} />
            {/* <Route path="/user" component={User} /> */}
            <Redirect from="/" to="/app" />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default RouterS;
