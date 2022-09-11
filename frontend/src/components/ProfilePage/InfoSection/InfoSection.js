import React from "react";
import { Link } from "react-router-dom";

/* Component for the Info section of profile page */
class InfoSection extends React.Component {

  render() {
    const { username, permission, year} = this.props;
    return (
      <div className="info-section">
        <div className="username-display">
          <h5 className="pb-1 border-bottom">Username</h5>
          <div className="pb-1 mb-4">
            <span className=" h6">{username}</span>
          </div>
        </div>

        <div className="permission-display">
          <h5 className="pb-1 border-bottom">Permission </h5>
          <div className="pb-2 mb-4">
            {permission === "admin" ? (
              <span className="text-danger font-weight-bold h6">
                {permission}
                <Link
                  className="btn btn-outline-danger btn-sm ml-4"
                  to={"/adminPage"}
                >
                  Go to admin page
                </Link>
              </span>
            ) : (
              <span className="text-success font-weight-bold h6">
                {permission}
              </span>
            )}
          </div>
        </div>

        <div className="year-display">
          <h5 className="border-bottom pb-1">Year of Study</h5>
          <div className="pb-1 mb-4 h6">
            <span className="">{year}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default InfoSection;
