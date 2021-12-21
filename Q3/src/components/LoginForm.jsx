import React from "react";
import uuid from "uuid/v4";

import { users as sampleUsers, breaches as sampleBreaches } from "../sample";

export default class LoginForm extends React.Component {
  state = {
    email: "",
    password: "",
    loginFailed: false
  };

  updateLogin(val) {
    this.setState({ ...val });
  }

  handleSubmit(e) {
    e.preventDefault();

    // NOTE: Normally would be hooked up to the code
    // from the previous problem, but you should leave
    // this hard-coded data for now. We're mostly
    // interested in the React portion of this code.
    if (this.state.email === sampleUsers[0].email) {
      this.setState({ loginFailed: false });
      // has no breaches
      this.props.onLoginSuccess({
        token: uuid(),
        user: sampleUsers[0]
      });
    } else if (this.state.email === sampleUsers[1].email) {
      this.setState({ loginFailed: false });
      // has breaches
      this.props.onLoginSuccess({
        token: uuid(),
        user: sampleUsers[1],
        meta: {
          suggestPasswordChange: true,
          breachedAccounts: sampleBreaches
        }
      });
    } else {
      this.setState({ loginFailed: true });
    }
    return false;
  }

  render() {
    return (
      <div>
        {this.state.loginFailed && (
          <div className="alert alert-danger mt-3">
            The email or password you provided is incorrect. Please check your
            entry and try again.
          </div>
        )}
        <div className="py-5 text-center">
          <h2>Sign In</h2>
        </div>
        <div>
          <form onSubmit={e => this.handleSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  required
                  onChange={e => this.updateLogin({ email: e.target.value })}
                  value={this.state.email}
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="password">Password</label>
              <div className="input-group">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  onChange={e => this.updateLogin({ password: e.target.value })}
                  required
                />
              </div>
            </div>

            <button className="btn btn-primary" type="submit">
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }
}
