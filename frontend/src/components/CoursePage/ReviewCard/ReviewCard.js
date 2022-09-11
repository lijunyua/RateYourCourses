import React from "react";
import { uid } from "react-uid";
import Tag from "../../Tag/Tag";
import { adminDeleteReview } from "../../../actions/coursePage";

class ReviewCard extends React.Component {
  render() {
    const { user, review, coursePageComponent } = this.props;
    let ratingColor;
    if (review.rating >= 90) {
      ratingColor = "RatingValExl";
    } else if (review.rating === "N/A") {
      ratingColor = "text-muted";
    } else if (review.rating >= 75) {
      ratingColor = "RatingValGood";
    } else if (review.rating >= 60) {
      ratingColor = "RatingValFair";
    } else if (review.rating >= 50) {
      ratingColor = "RatingValPoor";
    } else if (review.rating >= 20) {
      ratingColor = "RatingValBad";
    } else if (review.rating >= 0) {
      ratingColor = "RatingValTer";
    }
    return (
      <div className="card mb-1 mt-1">
        <div className="row no-gutters">
          <div className="col-2 d-flex align-items-center justify-content-center ">
            <div>
              Rating: <span className={`${ratingColor}`}>{review.rating}</span>{" "}
            </div>
          </div>
          <div className="col-10">
            <div className="card-body">
              <h5 className="card-title d-flex justify-content-between">
                {review.author}{" "}
                {user.permission === "admin" ? (
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => {
                      adminDeleteReview(
                        coursePageComponent,
                        review.index,
                        review.rating
                      );
                    }}
                  >
                    Delete
                  </button>
                ) : (
                  ""
                )}
              </h5>
              <p className="card-text">{review.comment}</p>
              <div className="d-flex">
                {review.tags
                  ? review.tags.map((tag) => <Tag name={tag} key={uid(tag)} />)
                  : ""}
              </div>
              <p className="card-text">
                <small className="text-muted">
                  Last updated: {review.date}
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReviewCard;
