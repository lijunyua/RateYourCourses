import React from "react";
import { deleteUser } from "../../../actions/adminPage";
import { uid } from "react-uid";

class UsersCard extends React.Component {
  render() {
    const { adminComponent, users } = this.props;
    return (
      <div className="card">
        <div className="card-header font-weight-bold">Manage Users</div>
        <ul className="list-group list-group-flush">
          {users
            ? users.map((user) => (
                <li
                  className="list-group-item d-flex justify-content-between"
                  key={uid(user)}
                >
                  {user.username}
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => {
                      deleteUser(adminComponent, user.username);
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

export default UsersCard;
