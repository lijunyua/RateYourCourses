import "./App.css";
import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AllCourses from "./components/AllCoursesPage/AllCourses/AllCourses";
import ProfilePage from "./components/ProfilePage/ProfilePage/ProfilePage";
import CoursePage from "./components/CoursePage/CoursePage/CoursePage";
import Header from "./components/Header/index";
import WriteReview from "./components/WriteReview/index";
import AdminPage from "./components/AdminPage/AdminPage/AdminPage";
import SearchView from "./components/SearchView/index";
import Login from "./components/Login/index";
import SignUp from "./components/SignUp/index"
import Dashboard from "./components/Dashboard/index";

import { checkLoginByCookie } from "./actions/login.js";


class App extends React.Component {
  
  componentDidMount() {
    checkLoginByCookie(this)
  }

  // login is true when user logging in, is false when user signing up
  state = {
    user: null,
    permission: null,
    login: true
  }

  render() {
    return (
      <div className="App flex-column ">
        <BrowserRouter>
          <Route 
            render = {props => (
              <div className="Header">
                {this.state.user ? <Header {...props} app={this}/> : <div></div>}
              </div>
            )}
          />
          <Switch>
            <Route
              exact path={["/", "/signup", "/dashboard"]}
              render={ props => (
                <div className="app">
                  {!this.state.user ? 
                      (this.state.login ? 
                      <Login {...props} app={this} /> : <SignUp {...props} app={this} />)
                  : <Dashboard {...props} user={this.state.user} />}
                </div>
              )}
            />
            <Route
              path="/allCourses"
              render={ props => (
                <div className="allCourses">
                  {!this.state.user ? <Login {...props} app={this} /> : <AllCourses user={this.state.user}/>}
                </div>
              )}
            />
            <Route
              path="/course/:id"
              render={ props => (
                <div className="course-page">
                  {!this.state.user ? <Login {...props} app={this} /> : <CoursePage {...props} user={this.state.user}/>}
                </div>
              )}
            />
            <Route
              path="/writeReviews"
              render={ props => (
                <div className="writeReviews">
                  {!this.state.user ? <Login {...props} app={this} /> : <WriteReview user={this.state.user}/>}
                </div>
              )}
            />
            <Route
              path="/profile"
              render={ props => (
                <div className="profile">
                  {!this.state.user ? <Login {...props} app={this} /> : <ProfilePage user={this.state.user}/>}
                </div>
              )}
            />
            <Route
              path="/searchResult/:id"
              render={ props => (
                <div className="searchResult">
                  {!this.state.user ? <Login {...props} app={this} /> : <SearchView {...props} user={this.state.user}/>}
                </div>
              )}
            />
            <Route
              path="/adminPage"
              render={ props => (
                <div className="adminPage">
                  {!this.state.user ? <Login {...props} app={this} /> : <AdminPage user={this.state.user}/>}
                </div>
              )}
            />
            <Route render={() => <div>404 Not found</div>}/>
          </Switch>
          
        </BrowserRouter>
      </div>
    );
  } 
}

export default App;
