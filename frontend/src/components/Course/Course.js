import React from "react";

import "./Course.css";

/* The Course Component */
class Course extends React.Component {
  render() {
    const { name} = this.props;
    return (
      <div className="course pl-2 pr-2 m-1 font-weight-bold">
        {name}
        
      </div>
    );
  }
}

export default Course;
