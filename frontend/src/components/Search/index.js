import React from "react";
import { uid } from "react-uid";
import CourseResult from "../CourseResult/CourseResult";
import { getData } from "../../actions/courseList";
import "./styles.css";

class Search extends React.Component {
  state = {
    courses: [],
  };

  componentDidMount() {
    this.setState({ courses: [] })
    getData(this)
  }

  strictFilter(str) {
    return (x) => {
      return x.code === str || x.name === str || x.tags.includes(str);
    };
  }

  searchCourse(k) {
    console.log(k);
    if (!k || k === "") return this.state.courses;
    return this.state.courses.filter(this.strictFilter(k));
  }

  render() {
    return (
      <div className="Search">
        {!this.props.keyword || this.props.keyword === "" ? (
          <h5>Showing: all courses</h5>
        ) : (
          <h3>
            Searching by <span className="keyword">{this.props.keyword}</span>
          </h3>
        )}
        {this.state.courses
          ? this.searchCourse(this.props.keyword).map((course) => (
              <CourseResult course={course} key={uid(course)} />
            ))
          : "No Course Available Right Now"}
      </div>
    );
  }
}

export default Search;
