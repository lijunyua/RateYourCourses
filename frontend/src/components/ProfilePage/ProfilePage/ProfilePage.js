import React from "react";
import UserProfile from "../UserProfile/UserProfile";
import "./ProfilePage.css";

class ProfilePage extends React.Component {
  render() {
  	const {user} = this.props
  	console.log(user)
    return (
      <div className="profile-page ">
        <UserProfile user={user} admin={1}/>
      </div>
    );
  }
}

export default ProfilePage;
