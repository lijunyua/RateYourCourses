import React from "react";
import { Link } from "react-router-dom";
import { signUp, handleInputChange, signUpToLogin, handleSignUp } from "../../actions/signup";

import "./styles.css";

/* Component for the SignUp page */
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.props.history.push("/signup")
  }

  state = {
    Username: "",
    Password: "",
    ConfirmPassword: ""
  }

  render() {

    const { app } = this.props

    return (
      <div className="d-flex p-2 justify-content-center align-items-center LoginPage">
        <div className="container rounded d-flex justify-content-center">
          <div className="card w-30 pl-5 pr-5 pt-5 pb-5">
            <h2 className="d-flex justify-content-center greetingTopBuffer">
              No Account? Create one!
            </h2>
            {/*TODO: add custom font*/}
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
                  autocomplete="new-password"
                  className="form-control"
                  id="inputPassword"
                  name="Password"
                  onChange={event => handleInputChange(this, event)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="inputPassword">Confirm Password</label>
                <input
                  type="password"
                  autocomplete="new-password"
                  className="form-control"
                  id="confirmPassword"
                  name="ConfirmPassword"
                  onChange={event => handleInputChange(this, event)}
                />
              </div>

              <div className="d-flex justify-content-center pt-3">
                <Link to={"/"}>
                  <button
                    type="submit"
                    className="btn btn-outline-success mr-5 buttonTopBuffer"
                    onClick={() => signUpToLogin(app)}
                  >
                    Login
                  </button>
                </Link>
                <Link to={"/dashboard"}>
                  <button
                    type="button"
                    className="btn btn-outline-primary buttonTopBuffer"
                    onClick={() => handleSignUp(this, app)}
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

export default SignUp;
