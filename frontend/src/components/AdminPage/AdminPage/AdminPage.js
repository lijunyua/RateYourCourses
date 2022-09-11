import React from "react";
import { getData } from "../../../actions/adminPage";
import UsersCard from "../UsersCard/UsersCard";
import CoursesCard from "../CoursesCard/CoursesCard";
import TagsCard from "../TagsCard/TagsCard";
import "./AdminPage.css";

class AdminPage extends React.Component {
  
  state = {
    thisUser: this.props.user,
    users: [],
    tags: [],
    courses: [],
    error: ""
  };

  componentDidMount() {
    getData(this);
  }
  render() {
    return (
      <div className="admin-page ">
        <div className="main-content container">
          <div>
            <h3 className="text-dark">
              Welcome to the admin page,{" "}
              <span className="text-danger">admin </span>{" "}
              <u>{this.state.thisUser.username}</u>
            </h3>
          </div>
          <div className="card-deck">
            <UsersCard adminComponent={this} users={this.state.users} />

            <CoursesCard adminComponent={this} courses={this.state.courses} />

            <TagsCard adminComponent={this} tags={this.state.tags} />
          </div>
        </div>
      </div>
    );
  }
}

export default AdminPage;
