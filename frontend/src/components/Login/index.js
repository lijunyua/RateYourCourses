import React from "react";
import { Link } from "react-router-dom";
import { login, loginToSignUp, handleInputChange } from "../../actions/login";

import "./styles.css";

/* Component for the Login page */
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.props.history.push("/")
  }

  state = {
    Username: "",
    Password: ""
  }

  render() {

    const { app } = this.props

    return (
      <div className="d-flex p-2 justify-content-center align-items-center LoginPage">
        <div className="container rounded d-flex justify-content-center">
          <div className="card w-30 pl-5 pr-5 pt-5 pb-5">
            <h2 className="d-flex justify-content-center greetingTopBuffer">
              Welcome to Rate Your Courses!
            </h2>
            <form className="inputTopBuffer">
              <div className="form-group">
                <label htmlFor="inputUsername">Username</label>
                <input
                  type="text"
                  autocomplete="username"
                  className="form-control"
                  id="inputUsername"
                  name="Username"
                  onChange={event => handleInputChange(this, event)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="inputPassword">Password</label>
                <input
                  type="password"
                  autocomplete="current-password"
                  className="form-control"
                  id="inputPassword"
                  name="Password"
                  onChange={event => handleInputChange(this, event)}
                />
              </div>

              <div className="d-flex justify-content-center pt-3">
                <Link to={"/dashboard"}>
                  <button
                    type="submit"
                    className="btn btn-outline-success mr-5 buttonTopBuffer"
                    onClick={() => login(this, app)}
                  >
                    Login
                  </button>
                </Link>
                <Link to={"/signup"}>
                  <button
                    type="submit"
                    className="btn btn-outline-primary buttonTopBuffer"
                    onClick={() => loginToSignUp(app)}
                  >
                    Sign Up
                  </button>
                </Link>
                
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
