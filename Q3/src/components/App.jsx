import React from "react";

import LoginForm from "./LoginForm";
import Dashboard from "./Dashboard";

export default class App extends React.Component {
  state = {
    auth: {
      token: "",
      user: {},
      meta: {}
    }
  };

  onLoginSuccess = auth => {
    this.setState({ auth });
  };

  onLogOut = e => {
    this.setState({
      auth: {
        token: "",
        user: {},
        meta: {}
      }
    });
  };

  currentPage() {
    return this.state.auth.token ? (
      <Dashboard />
    ) : (
      <LoginForm onLoginSuccess={this.onLoginSuccess} />
    );
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-info">
          <a className="navbar-brand mr-auto" href="#">
            AppCo
          </a>

          {this.state.auth.token && (
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  Home <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Tasks
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={this.onLogOut}>
                  Log out
                </a>
              </li>
            </ul>
          )}
        </nav>
        <div className="container">{this.currentPage()}</div>
      </div>
    );
  }
}
