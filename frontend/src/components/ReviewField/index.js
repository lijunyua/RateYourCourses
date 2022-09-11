import React from "react";
import { uid } from "react-uid";

import "./styles.css";

import { postReview } from "../../actions/PostReview";
import { getData } from "../../actions/courseList"
import { getTags } from "../../actions/tags"

const log = console.log
class ReviewField extends React.Component {
    state = {
        courses: [],
        tags: [],
        course: "",
        tag1: "",
        tag2: "",
        tag3: "",
        rating: "",
        comment: "",
        user: ""
    }

    constructor(props) {
        super(props)
        this.state= {
        courses: [],
        tags: [],
        course: "",
        tag1: "",
        tag2: "",
        tag3: "",
        rating: "",
            comment: "",
        user: ""
         };
        getData(this)
        getTags(this)    
        log(this.state.courses)
    }
    
    submitCompleted()
    {
        alert(`Successed!`)
        window.location.href = "/Dashboard"
    }
    submitFailed(err)
    {
        alert(`Submission Failed. Please try again later. Error Code: ${err}`);
    
    }

    
  UpdState() {
        this.state.course = document.getElementById("Course Code Select").value
        this.state.tag1 = document.getElementById("Tag Select1").value
        this.state.tag2 = document.getElementById("Tag Select2").value
        this.state.tag3 = document.getElementById("Tag Select3").value
        this.state.rating = document.getElementById("RatingBar").value
        this.state.comment = document.getElementById("Comment").value
        this.state.user = this.props.user
        log(this.state)
  }

  componentDidMount()
  {
    const tmpbtn = document.getElementById("submitBtn");
    tmpbtn.disabled = true;
  }


  ValidateTag() {//TODO: Also make sure one course is selected.
    const tmp0 = document.getElementById("Course Code Select").value;
    const tmp1 = document.getElementById("Tag Select1").value;
    const tmp2 = document.getElementById("Tag Select2").value;
    const tmp3 = document.getElementById("Tag Select3").value;
    const tmpbtn = document.getElementById("submitBtn");
    console.log(tmp1, tmp2, tmp3);
    if (!tmp0||tmp0 === ""||tmp1 === tmp2 || tmp2 === tmp3 || tmp1 === tmp3) {
      tmpbtn.disabled = true;
    } else {
      tmpbtn.disabled = false;
    }
  }


  UpdRating() {
    console.log(":(");
    const tmp = document.getElementById("RatingText");
    const rtt = document.getElementById("RatingType");
    tmp.innerHTML = document.getElementById("RatingBar").value;
    if (tmp.innerHTML >= 90) {
      rtt.className = tmp.className = "RatingValExl";
      rtt.innerHTML = "Excelent!";
    } else if (tmp.innerHTML >= 75) {
      rtt.className = tmp.className = "RatingValGood";
      rtt.innerHTML = "Good";
    } else if (tmp.innerHTML >= 60) {
      rtt.className = tmp.className = "RatingValFair";
      rtt.innerHTML = "Fair";
    } else if (tmp.innerHTML >= 50) {
      rtt.className = tmp.className = "RatingValPoor";
      rtt.innerHTML = "Poor";
    } else if (tmp.innerHTML >= 20) {
      rtt.className = tmp.className = "RatingValBad";
      rtt.innerHTML = "Bad";
    } else {
      rtt.className = tmp.className = "RatingValTer";
      rtt.innerHTML = "Terrible!";
    }
  }

  render() {
    log(this.state)

    log(this.state.courses)
    log(this.state.tags)
    return (
      <div className="ReviewField">
        <form className="container">
          <div className="form-group">
            <label>Select Course Code</label>
            <select className="form-control" id="Course Code Select">
              {this.state.courses.map((course) => (
                <option key={uid(course)}>{course.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <div className="form-row">
              <div className="col">
                <label>Select Tag #1</label>
                <select
                  className="form-control"
                  id="Tag Select1"
                  onChange={this.ValidateTag}
                >
                  {this.state.tags.map((tag) => (
                    <option key={uid(tag)}>{tag.name}</option>
                  ))}
                </select>
              </div>
              <div className="col">
                <label>Select Tag #2</label>
                <select
                  className="form-control"
                  id="Tag Select2"
                  onChange={this.ValidateTag}
                >
                  {this.state.tags.map((tag) => (
                    <option key={uid(tag)}>{tag.name}</option>
                  ))}
                </select>
              </div>
              <div className="col">
                <label>Select Tag #3</label>
                <select
                  className="form-control"
                  id="Tag Select3"
                  onChange={this.ValidateTag}
                >
                  {this.state.tags.map((tag) => (
                    <option key={uid(tag)}>{tag.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="form-row">
              <div className="col">
                <label>
                  Your Overall Rating:{" "}
                  <span className="RatingValPoor" id="RatingText">
                    {50}
                  </span>
                </label>
              </div>
              <div className="col">
                <div className="RatingType">
                  <span className="RatingValPoor" id="RatingType">
                    {" "}
                    Poor
                  </span>
                </div>
              </div>
            </div>
            <input
              type="range"
              className="form-control-range"
              id="RatingBar"
              onChange={this.UpdRating}
            />
          </div>
          <div className="form-group">
            <label>Your comment</label>
            <textarea className="form-control" id="Comment" rows="5"></textarea>
          </div>
          <button className="btn btn-danger" type="button" id="submitBtn" onClick={()=> postReview(this)}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}
export default ReviewField;
/*

<button className="btn btn-success" type="button" id="submitBtn" disabled={true} onClick={() => postReview(this)}>
            Submit
          </button>
*/