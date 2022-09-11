// get the data we need for all courses
export const postReview = (fromComp) => {
   console.log("PostReview Invoked.")
  // Get data from server
  // code below requires server call
   fromComp.UpdState();
  const url = "/review";
  
    // The data we are going to send in our request
    const review = fromComp.state

    // Create our request constructor with all the parameters we need
    //TODO: FIX
    const request = new Request(url, {
        method: "post",
        body: JSON.stringify({
          index: 1,
          author: review.user,
          date: "Now",
          rating:review.rating,
          course: review.course,
          tags: [review.tag1, review.tag2, review.tag3],
          comment: review.comment
        }),
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json"
		}
    });
    console.log(request)
    /*
    console.log({
          index: 1,
          author: review.user,
          date: "",
          rating:review.rating,
          course: review.course,
          tags: [review.tag1, review.tag2, review.tag3],
          comment: review.comment,
        })
     Send the request with fetch()*/
    fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                // If student was added successfully, tell the user.
                console.log("Success!")
                fromComp.submitCompleted();                
                return
            } else {
                // If server couldn't add the student, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                fromComp.submitFailed(res.status);
            }
        })
        .catch(error => {
            console.log(error);
        });
};
