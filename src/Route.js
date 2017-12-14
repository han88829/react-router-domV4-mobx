import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Admin from './component/admin';
// import Login from './component/login';
import Bundle from './Bundle';//按需加载

const Login = (props) => (
  <Bundle load={() => import('./component/login')}>
    {(Login) => <Login {...props} />}
  </Bundle>
)

class RouterS extends Component {

  
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/mobx" component={Admin} />
            <Route path="/mobx/login" exact component={Login} />

            {/* 重定向路由 */}
            {<Redirect from="/" to="/mobx/app" />}

          </Switch>
        </div>
      </Router>
    );
  }
}


export default RouterS;
