import React from "react";
import Course from "../../Course/Course";
import { uid } from "react-uid";

/* Component for the Course section of profile page */
class CourseSection extends React.Component {
  render() {
    const { coursesTaken, profileComponent } = this.props;
    return (
      <div className="course-display">
        <h5 className="pb-1 border-bottom">Courses Taken</h5>
        <div className="course-section d-inline-flex pb-2 mb-4">
          {coursesTaken
            ? coursesTaken.map((course) => (
                <Course
                  key={uid(course.code)}
                  name={course.code}
                  profileComponent={profileComponent}
                />
              ))
            : ""}
        </div>
      </div>
    );
  }
}

export default CourseSection;
