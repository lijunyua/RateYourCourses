import React from "react";
import { uid } from "react-uid";
import Tag from "../../Tag/Tag";
import { getData } from "../../../actions/coursePage";
import ReviewCard from "../ReviewCard/ReviewCard";
class CoursePage extends React.Component {
  state = {
    user: {},
    code: "",
    name: "",
    prerequisite: [],
    rating: "",
    tags: [],
    reviews: [],
  };
  componentDidMount() {
    getData(this, this.props.user, this.props.match.params.id);
  }
  render() {
    let ratingText;
    let ratingColor;
    if (this.state.rating >= 90) {
      ratingText = "Excellent!";
      ratingColor = "RatingValExl";
    } else if (this.state.rating === null) {
      ratingText = "Not Enough Ratings";
      ratingColor = "text-muted";
    } else if (this.state.rating >= 75) {
      ratingText = "Good";
      ratingColor = "RatingValGood";
    } else if (this.state.rating >= 60) {
      ratingText = "Fair";
      ratingColor = "RatingValFair";
    } else if (this.state.rating >= 50) {
      ratingText = "Poor";
      ratingColor = "RatingValPoor";
    } else if (this.state.rating >= 20) {
      ratingText = "Bad";
      ratingColor = "RatingValBad";
    } else if (this.state.rating >= 50) {
      ratingText = "Terrible";
      ratingColor = "RatingValTerrible";
    }
    console.log("state", this.state)
    return (
      <div className="course-page">
        <div className="container">
          <h3>
            <span>
              {this.state.code}: {this.state.name}
            </span>
          </h3>

          <div className="level h6">
            <span>Prerequisite: </span>
            <span className="font-weight-bold">{this.state.prerequisite.map((pre)=>(pre))}</span>
          </div>

          <div className="ave-rating h6">
            <span>Average Rating: </span>
            <span className={`${ratingColor} font-weight-bold`}>
              {this.state.rating ? this.state.rating : ratingText}
            </span>
          </div>

          <div className="ave-rating h6 d-flex align-items-center">
            <span>Tags: </span>
            <div className="d-flex ml-1">
              {this.state.tags.length ? (
                this.state.tags.map((tag) => <Tag name={tag} key={uid(tag)} />)
              ) : (
                <span className="text-muted">
                  Sorry, there are no tags for this course.
                </span>
              )}
            </div>
          </div>

          <div className="review-num h6">
            <span>Number of Reviews: </span>
            <span className="font-weight-bold">{this.state.reviewNum}</span>
          </div>

          <div className="recommendation h6">
            <span>Recommendation: </span>
            <span className={`${ratingColor} font-weight-bold`}>
              {ratingText}
            </span>
          </div>

          <div className="reviews">
            <h4>Reviews</h4>
            {this.state.user.permission === "admin" &&
            this.state.reviews.length ? (
              <span>
                You are <span className="text-danger">admin</span>, you can
                delete reviews
              </span>
            ) : (
              ""
            )}
            {this.state.reviews.length
              ? this.state.reviews.map((review) => (
                  <ReviewCard
                    user={this.state.user}
                    review={review}
                    coursePageComponent={this}
                    key={uid(review)}
                  />
                ))
              : "Sorry, there are currently no reviews for this course."}
          </div>
        </div>
      </div>
    );
  }
}

export default CoursePage;
