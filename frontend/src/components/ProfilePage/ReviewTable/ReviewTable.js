import React from "react";
import { uid } from "react-uid";
import { removeReview } from "../../../actions/userProfile";
import Course from "../../Course/Course";
import Tag from "../../Tag/Tag";

/* The Profile Component */
class ReviewTable extends React.Component {
  render() {
    const { profileComponent } = this.props;
    const reviewList = profileComponent.state.reviews;
    return (
      <div className="ReviewTable table">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Courses</th>
              <th scope="col">Rating</th>
              <th scope="col">Tags</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {reviewList.map((review) => (
              <tr key={uid(review)}>
                <td className="d-flex">{<Course name={review.course} />}</td>
                <td>{review.rating}</td>
                <td className="d-flex">
                  {review.tags.map((tag) => (
                    <Tag
                      key={uid(tag)}
                      name={tag}
                    />
                  ))}
                </td>
                <td>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => removeReview(profileComponent, review.index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ReviewTable;
