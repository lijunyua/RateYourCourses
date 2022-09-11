import React from "react";

import { setUpUser } from "../../actions/dashboard";

import CourseResult from "../CourseResult/CourseResult";

import "./styles.css";
import { uid } from "react-uid";

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.props.history.push("/dashboard")
  }

  state = {
    thisUser: this.props.user,
    recommendedCourses: null
  };
  
  componentDidMount() {
    setUpUser(this.props.user, this)
  }

  render() {
    return (
      <div className="d-flex p-2 flex-column DashboardPage">
        <div className="container">
          <h5>Welcome, {this.state.thisUser}!</h5>
          {this.state.recommendedCourses
            ? <h5>Recommended Courses Based On Your Preferences</h5>
            : <h5>Please Complete Your Profile Page For Course Recommendation</h5>}
          {this.state.recommendedCourses
            ? this.state.recommendedCourses.map((course) => (
                <CourseResult course={course} key={uid(course)} />
              ))
            : ""}
          {/*console.log(this.state.recommendedCourses)*/}
        </div>
      </div>
    );
  }
}

export default Dashboard;
