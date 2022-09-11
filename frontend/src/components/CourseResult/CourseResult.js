import React from "react";
import Tag from "../Tag/Tag";
import { Link } from "react-router-dom";
import { uid } from "react-uid";

class CourseResult extends React.Component {
  render() {
    const { course } = this.props;
    let ratingText;
    let ratingColor;
    if (course.rating === null) {
      ratingText = "Not Enough Ratings";
      ratingColor = "text-muted";
    } else if (course.rating >= 90) {
      ratingText = "Excellent!";
      ratingColor = "RatingValExl";
    } else if (course.rating >= 75) {
      ratingText = "Good";
      ratingColor = "RatingValGood";
    } else if (course.rating >= 60) {
      ratingText = "Fair";
      ratingColor = "RatingValFair";
    } else if (course.rating >= 50) {
      ratingText = "Poor";
      ratingColor = "RatingValPoor";
    } else if (course.rating >= 20) {
      ratingText = "Bad";
      ratingColor = "RatingValBad";
    } else if (course.rating >= 0) {
      ratingText = "Terrible";
      ratingColor = "RatingValTer";
    }
    return (
      <div className="list-group-item list-group-item-action">
        <div className="d-flex w-100 justify-content-between">
          <h4 className="mb-1">
            {course.code}: {course.name}
          </h4>
          <small className={ratingColor}>{ratingText}</small>
        </div>
        <div className="d-flex w-100 mb-1">
          <span className="mr-5 align-items-center d-flex">
            Average Rating:{" "}
            <span className={`${ratingColor}`}>{course.rating==null?"N/A":Math.round(course.rating)}</span>
          </span>
          <span className="align-items-center d-flex">
            Number of Reviews:{" "}
            <span className="text-primary">{course.reviews.length}</span>
          </span>
        </div>
        <div className="d-flex w-100 justify-content-between">
          <span className="d-flex align-items-center">
            Tags:{" "}
            {course.tags.length
              ? course.tags.map((tag) => <Tag name={tag} key={uid(tag)} />)
              : "None"}
          </span>
          <Link
            className="btn btn-sm btn-outline-primary"
            to={`/course/${course.code}`}
          >
            View Detail
          </Link>
        </div>
      </div>
    );
  }
}

export default CourseResult;
