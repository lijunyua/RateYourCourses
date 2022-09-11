// get user for profile page
export const getUser = (user, profileComp) => {
  // Get data from server
  // code below requires server call
  let url1 = "/api/allTags";
  let allCourses;
  let allTags;
  let allReviews;
  fetch(url1)
    .then((res) => {
      if (res.status === 200) {
        // return a promise that resolves with the JSON body
        return res.json();
      } else {
        alert("Could not get all tags");
      }
    })
    .then((json) => {
      // the resolved promise with the JSON body
      allTags = json;
    })
    .catch((error) => {
      console.log(error);
    });

  url1 = "/api/allCourses";
  fetch(url1)
    .then((res) => {
      if (res.status === 200) {
        // return a promise that resolves with the JSON body
        return res.json();
      } else {
        alert("Could not get all courses");
      }
    })
    .then((json) => {
      // the resolved promise with the JSON body
      allCourses = json;
    })
    .catch((error) => {
      console.log(error);
    });

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
    .then((json) => {
      // the resolved promise with the JSON body
      allReviews = json;
    })
    .catch((error) => {
      console.log(error);
    });
  // the URL for the request
  const url = `/api/users/${user}`;

  // Since this is a GET request, simply call fetch on the URL
  fetch(url)
    .then((res) => {
      if (res.status === 200) {
        // return a promise that resolves with the JSON body
        return res.json();
      } else {
        alert("Could not get user info");
      }
    })
    .then((json) => {
      // the resolved promise with the JSON body
      const taken = allCourses.filter((course) => {
        return json.coursesTaken.includes(course._id)}
      );
      const prefer = allTags.filter((tag) => {
        return json.preferredTags.includes(tag._id)}
      );
      const rev = allReviews.filter((review) =>
        {return json.review.includes(review._id)}
      );
      const notTaken = allCourses.filter((course) => {return !taken.includes(course)});
      const notSelectedTags = allTags.filter((tag) => {return !prefer.includes(tag)});
      profileComp.setState({
        username: json.username,
        permission: json.permission,
        year: json.year,
        preferredTags: prefer,
        coursesTaken: taken,
        reviews: rev,
        notTakenCourses: notTaken,
        notSelectedTags: notSelectedTags,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

// change year
export const editInfo = async (form, profileComp, user) => {
  // the URL for the request

  let url1 = "/api/allTags";
  let allCourses;
  let allTags;
  const a = await fetch(url1)
    .then((res) => {
      if (res.status === 200) {
        // return a promise that resolves with the JSON body
        return res.json();
      } else {
        alert("Could not get all tags");
      }
    })
    .then((json) => {
      // the resolved promise with the JSON body
      allTags = json;
    })
    .catch((error) => {
      console.log(error);
    });

  url1 = "/api/allCourses";
  const b = await fetch(url1)
    .then((res) => {
      if (res.status === 200) {
        // return a promise that resolves with the JSON body
        return res.json();
      } else {
        alert("Could not get all courses");
      }
    })
    .then((json) => {
      // the resolved promise with the JSON body
      allCourses = json;
    })
    .catch((error) => {
      console.log(error);
    });

  const url = `/api/users/${user}`;

  // The data we are going to send in our request
  const newData = new FormData(form);
  let object = {};
  
  for (let pair of newData.entries()) {
    console.log(pair[0]+ ', ' + pair[1]); 
  }
  newData.forEach((value, key) => {
      // Reflect.has in favor of: object.hasOwnProperty(key)
      if(!Reflect.has(object, key)){
          object[key] = value;
          return;
      }
      if(!Array.isArray(object[key])){
          object[key] = [object[key]];    
      }
      object[key].push(value);
  });

  console.log(object)
  const request = new Request(url, {
    method: "PATCH",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  });
  // Send the request with fetch()
  fetch(request)
    .then((res) => {
      // Handle response we get from the API.
      // Usually check the error codes to see what happened.
      if (res.status === 200) {
        return res.json();
      } else {
        alert(res.status);
      }
    })
    .then((json) => {
      console.log(json)
      

      const taken = allCourses.filter((course) =>
        json.coursesTaken.includes(course._id)
      );
      const prefer = allTags.filter((tag) =>
        json.preferredTags.includes(tag._id)
      );
      const notTaken = allCourses.filter((course) => !taken.includes(course));
      const notSelectedTags = allTags.filter((tag) => !prefer.includes(tag));
    
      profileComp.setState({
        coursesTaken: taken,
        preferredTags: prefer,
        year: json.year,
        notTakenCourses: notTaken,
        notSelectedTags: notSelectedTags,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

// remove a review
export const removeReview = (profileComp, id) => {
  // the URL for the request
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
      if (res.status === 200) {
        // filters out the Review we don't want.
        const filteredReviews = profileComp.state.reviews.filter((review) => {
          return review.index !== id;
        });
        profileComp.setState({
          reviews: filteredReviews,
        });
      } else {
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
