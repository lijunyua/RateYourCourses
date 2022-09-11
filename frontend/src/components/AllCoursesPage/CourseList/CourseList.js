import React from "react";
import { uid } from "react-uid";
import { getData } from "../../../actions/courseList";
import CourseResult from "../../CourseResult/CourseResult";
class CourseList extends React.Component {
  state = {
    courses: [],
  };

  componentDidMount() {
    getData(this);
  }

  render() {
    return (
      <div className="all-courses-page">
        {this.state.courses
          ? this.state.courses.map((course) => (
              <CourseResult course={course} key={uid(course)} />
            ))
          : "No Course Available Right Now"}
      </div>
    );
  }
}

export default CourseList;
