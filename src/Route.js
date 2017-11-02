import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Admin from './component/admin';
import Login from './component/login';


class RouterS extends Component {

  render() {
    console.log(this.props)
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/home" component={Admin} />
            <Route path="/login" exact component={Login} />

            {/* 重定向路由 */}
            {<Redirect from="/" to="/home/app" />}

          </Switch>
        </div>
      </Router>
    );
  }
}


export default RouterS;
