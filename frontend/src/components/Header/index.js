import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../actions/login";
import "./styles.css";
import { withRouter } from "react-router";

/* The Header Component */
class Header extends React.Component {
  constructor(props) {
      super(props)
      document.addEventListener("keypress", function(event) {
          if (event.keyCode === 13)
          {event.preventDefault();
              document.getElementById("goSearchBtn").click();
              }
              
          }, false);
  }

  goSearch(ts){
    
       if(!document.getElementById("SearchInput").value || document.getElementById("SearchInput").value==="")
       {
       
       
       ts.props.history.push("/allCourses")
       }
       else{const x = "/searchResult/" + document.getElementById("SearchInput").value;
      console.log(x)

      //window.location.href = x
      
      ts.props.history.push({
            pathname: x
        })}
      
  }
  
  render() {

    const { app } = this.props

    return (
      <div className="header">
        <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
          <a className="navbar-brand" href="/dashboard">
            Rate Your Courses
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse">
            <form className="form-inline">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Find your course"
                aria-label="Search"
                id = "SearchInput"
              />
              <button className="btn btn-outline-info my-2 my-sm-0" id = "goSearchBtn" type="button" onClick = {() => this.goSearch(this)}>
                Search
              </button>
            </form>
          </div>
          <div className="navbar-nav">
            <Link className="nav-item nav-link" to="/dashboard">
              Dashboard
            </Link>
            <Link className="nav-item nav-link" to="/allCourses">
              All Courses
            </Link>
            <Link className="nav-item nav-link" to="/writeReviews">
              Write Reviews
            </Link>
            <Link className="nav-item nav-link" to="/profile">
              My Profile
            </Link>
            <Link className = "nav-item nav-link"
                  to="/"
                  onClick = {() => logout(app)}
            >
              Log out
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(Header);
