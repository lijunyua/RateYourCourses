import React from "react";
import "./UserProfile.css";

import { getUser, editInfo } from "../../../actions/userProfile";
import InfoSection from "../InfoSection/InfoSection";
import TagSection from "../TagSection/TagSection";
import CourseSection from "../CourseSection/CourseSection";
import ReviewTable from "../ReviewTable/ReviewTable";

/* The UserProfile Component */
class UserProfile extends React.Component {
  constructor(props) {
    // When the component is created
    super(props);
    this.state = {
      username: "",
      permission: "",
      year: "",
      preferredTags: [],
      coursesTaken: [],
      reviews: [],
      notTakenCourses: [],
      notSelectedTags: [],
      newYear: "",
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({ newYear: event.target.value });
  };

  componentDidMount() {
    // When the component enters the DOM
    getUser(this.props.user, this);
    this.setState({newYear: this.state.year})
  }

  render() {
    return (
      <div className="user-profile-page ">
        <div className="main-content container pt-2">
          <InfoSection
            username={this.state.username}
            permission={this.state.permission}
            year={this.state.year}
            profileComponent={this}
          />

          <CourseSection
            coursesTaken={this.state.coursesTaken}
            notTakenCourses={this.state.notTakenCourses}
            profileComponent={this}
          />

          <TagSection
            preferredTags={this.state.preferredTags}
            notSelectedTags={this.state.notSelectedTags}
            profileComponent={this}
          />

          <div className="edit-information">
            <button
              className="btn btn-outline-danger"
              data-toggle="collapse"
              data-target="#editSection"
            >
              Edit Information
            </button>
            <div class="collapse" id="editSection">
              <form
                className="editInfo"
                onSubmit={(e) => {
                  e.preventDefault();
                  editInfo(e.target, this, this.props.user);
                }}
              >
                <div className="form-group">
                  <label className="h5" for="newpassword">
                    New Password
                  </label>
                  <input
                    name="newPwd"
                    type="text"
                    className="form-control"
                    id="newpassword"
                    min="8"
                  />
                  <small id="pwdHelp" className="form-text text-muted">
                    Keep it to yourself.
                  </small>
                </div>
                <div className="form-group">
                  <label className="h5" for="newYearT">
                    New Year
                  </label>
                  <input
                    name="newYear"
                    type="number"
                    className="form-control"
                    id="newYearT"
                    value={this.state.newYear}
                    onChange={(e) => this.handleChange(e)}
                    min="1"
                    max="4"
                  />
                </div>

                <span className="h5">Change Courses Taken</span>
                <div className="form-group">
                  <select
                    multiple
                    className="form-control"
                    id=""
                    name="removedCourses"
                  >
                   {this.state.coursesTaken.length ? <option value={null} > </option>: <option value={null} selected> </option> } 
                    {this.state.coursesTaken.map((course) => (
                      <option value={course._id} selected>
                        {course.code}
                      </option>
                    ))}
                    {this.state.notTakenCourses.map((course) => (
                      <option value={course._id}>{course.code}</option>
                    ))}
                  </select>
                </div>

                <span className="h5">Change Tags</span>
                <div className="form-group">
                  <select
                    multiple
                    className="form-control"
                    id=""
                    name="newTags"
                  >
                    {this.state.preferredTags.length ? <option value={null} > </option>: <option value={null} selected> </option> }
                    {this.state.preferredTags.map((tag) => (
                      <option value={tag._id} selected>
                        {tag.name}
                      </option>
                    ))}
                    {this.state.notSelectedTags.map((tag) => (
                      <option value={tag._id}>{tag.name}</option>
                    ))}
                  </select>
                </div>

                <button type="submit" className="btn btn-sm btn-outline-danger">
                  Submit
                </button>
              </form>
            </div>
          </div>

          <div className="review-display">
            <h5>My Reviews</h5>
            <ReviewTable profileComponent={this}></ReviewTable>
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;
