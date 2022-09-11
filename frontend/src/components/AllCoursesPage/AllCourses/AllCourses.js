import React from "react";
import CourseList from "../CourseList/CourseList";

class AllCourses extends React.Component {
  render() {
    return (
      <div className="all-courses-page">
        <div className="container">
          <h5>Showing: all courses</h5>
          <CourseList />
        </div>
      </div>
    );
  }
}

export default AllCourses;
