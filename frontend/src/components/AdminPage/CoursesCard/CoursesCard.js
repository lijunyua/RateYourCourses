import React from "react";
import { deleteCourse, addNewCourse } from "../../../actions/adminPage";
import Course from "../../Course/Course";
import { uid } from "react-uid";

class CoursesCard extends React.Component {
  state = {
    newCourseCode: "",
    newCourseName: "",
  };
  handleCodeChanges = (event) => {
    event.preventDefault();
    this.setState({ newCourseCode: event.target.value });
  };
  handleNameChanges = (event) => {
    event.preventDefault();
    this.setState({ newCourseName: event.target.value });
  };
  render() {
    const { adminComponent, courses } = this.props;
    return (
      <div className="card ">
        <div className="card-header font-weight-bold d-flex justify-content-between">
          Manage Courses{" "}
          <button
            className="btn btn-sm btn-outline-success"
            data-toggle="collapse"
            data-target="#addNewCourse"
            aria-expanded="false"
            aria-controls="addNewCourse"
          >
            Add Course
          </button>
        </div>
        <div>
          <div className="collapse card-header" id="addNewCourse">
            <form
              className="addNewCourse"
              onSubmit={(e) => {
                e.preventDefault();
                addNewCourse(e.target, adminComponent, this, this.state.newCourseCode, this.state.newCourseName);
              }}
            >
              <div className="form-group ">
                <label htmlFor="newCourseCode">Code</label>
                <input
                  type="text"
                  name="newCourseCode"
                  className="form-control newCourseCode"
                  id="newCourseCode"
                  placeholder="Course Code"
                  onChange={this.handleCodeChanges}
                  value={this.state.newCourseCode}
                  required
                />
              </div>
              <div className="form-group ">
                <label htmlFor="newCourseCourse">Name</label>
                <input
                  type="text"
                  name="newCourseName"
                  className="form-control"
                  id="newCourseName"
                  placeholder="Course Name"
                  onChange={this.handleNameChanges}
                  value={this.state.newCourseName}
                  required
                />
              </div>
              <button className="btn btn-sm btn-outline-danger">Add</button>
            </form>
          </div>
        </div>

        <ul className="list-group list-group-flush">
          {courses
            ? courses.map((course) => (
                <li
                  className="list-group-item d-flex justify-content-between"
                  key={uid(course)}
                >
                  <Course name={course.code} />
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => {
                      deleteCourse(adminComponent, course.code);
                    }}
                  >
                    Delete
                  </button>
                </li>
              ))
            : ""}
        </ul>
      </div>
    );
  }
}

export default CoursesCard;
