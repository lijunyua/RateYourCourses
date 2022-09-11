import React from "react";

import "./Tag.css";

/* The Tag Component */
class Tag extends React.Component {
  render() {
    const { name } = this.props;
    return (
      <div className="tag pl-2 pr-2 m-1 font-weight-bold">
        {name}
      </div>
    );
  }
}

export default Tag;
