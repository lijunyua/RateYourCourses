// given courseName, find related data in our server
export const getData = (coursePageComp, user, courseName) => {
  // Get data from server
  // code below requires server call
  // the URL for the request

  // Since this is a GET request, simply call fetch on the URL
  const url = `/api/course/${courseName}`;
  fetch(url)
    .then((res) => {
      if (res.status === 200) {
        // return a promise that resolves with the JSON body
        return res.json();
      } else {
        alert(res.status);
      }
    })
    .then((json) => {
      const url = `/api/users/${user}`;
      // Since this is a GET request, simply call fetch on the URL
      fetch(url)
        .then((res) => {
          if (res.status === 200) {
            // return a promise that resolves with the JSON body
            return res.json();
          } else {
            alert("Could not get images");
          }
        })
        .then((jsona) => {
          // the resolved promise with the JSON body
          coursePageComp.setState({
            user: jsona,
          });
          let url1 = "/api/allTags";
          let allReviews;
          url1 = "/api/allReviews";
          fetch(url1)
            .then((res) => {
              if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
              } else {
                alert("Could not get all reviews");
              }
            })
            .then((jsonb) => {
              // the resolved promise with the JSON body
              allReviews = jsonb;
              const rev = allReviews.filter((review) => {
                return json.reviews.includes(review._id);
              });
              // the resolved promise with the JSON body
              coursePageComp.setState({
                code: json.code,
                name: json.name,
                prerequisite: json.prerequisite,
                rating: json.rating,
                tags: json.tags,
                reviews: rev,
                reviewNum: rev.length
              });
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
};

// remove reviews
export const adminDeleteReview = (coursePageComp, id, rating) => {
  const url = `/api/review/${id}`;

  // Create our request constructor with all the parameters we need
  const request = new Request(url, {
    method: "delete",
  });

  // Send the request with fetch()
  fetch(request)
    .then(function (res) {
      // Handle response we get from the API.
      // Usually check the error codes to see what happened.
      console.log("Success, we now update the page.")
      if (res.status === 200) {
        // filters out the review we don't want.
        const filteredReviews = coursePageComp.state.reviews.filter(
          (review) => {
            return review.index !== id;
          }
        );
        const newReviewNum = coursePageComp.state.reviews.length - 1;
        let newRating;
        if (newReviewNum) {
          newRating =
            (coursePageComp.state.rating * coursePageComp.state.reviewNum -
              rating) /
            newReviewNum;
        } else {
          newRating = "N/A";
        }

        coursePageComp.setState({
          reviews: filteredReviews,
          reviewNum: newReviewNum,
          rating: newRating,
        });
      } else {
      }
    })
    .catch((error) => {
      return console.log(error);
    });

  // need also to update our data base
};
