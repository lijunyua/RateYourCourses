// get data for admin page
export const getData = (adminComp) => {
  // Get data from server
  // code below requires server call
  let url = "/api/allUsers";
  fetch(url)
    .then((res) => {
      if (res.status === 200) {
        // return a promise that resolves with the JSON body
        return res.json();
      } else {
        alert("Could not get all users");
      }
    })
    .then((json) => {
      console.log(json.filter((user)=>{return user.username !== adminComp.state.thisUser}));
      // the resolved promise with the JSON body

      adminComp.setState({
        users: json.filter((user)=>{return user.username !== adminComp.state.thisUser}),
      });
    })
    .catch((error) => {
      console.log(error);
    });

  url = "/api/allTags";
  fetch(url)
    .then((res) => {
      if (res.status === 200) {
        // return a promise that resolves with the JSON body
        return res.json();
      } else {
        alert("Could not get all tags");
      }
    })
    .then((json) => {
      console.log(json);
      // the resolved promise with the JSON body
      adminComp.setState({
        tags: json,
      });
    })
    .catch((error) => {
      console.log(error);
    });

  url = "/api/allCourses";
  fetch(url)
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
      adminComp.setState({
        courses: json,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

// Delete user from our server and state
export const deleteUser = (admin, name) => {
  // Del data from server
  // code below requires server call
  // filters out the user we don't want.
  const url = `/api/users/${name}`;

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
        const filteredUsers = admin.state.users.filter((user) => {
          return user.username !== name;
        });
        admin.setState({
          users: filteredUsers,
        });
      } else {
      }
    })
    .catch((error) => {
      console.log(error);
    });
  // we need to also remove related entry in our database
};

export const addNewCourse = (form, adminComp, coursesCard, cCode, cName) => {
  const url = "/api/course";
  // The data we are going to send in our request

  const courseData = new FormData(form);
  // for (var pair of courseData.entries()) {
  //   console.log(pair[0] + ", " + pair[1]);
  // }

  // Create our request constructor with all the parameters we need
  const request = new Request(url, {
    method: "post",
    body: courseData,
  });

  // Send the request with fetch()
  fetch(request)
    .then(function (res) {
      // Handle response we get from the API.
      // Usually check the error codes to see what happened.
      if (res.status === 200) {
        coursesCard.setState({ newCourseCode: "", newCourseName: "" });
        const coursesList = adminComp.state.courses;
        coursesList.push({ code: cCode, name: cName });
        adminComp.setState({
          courses: coursesList,
        });
      } else {
        adminComp.setState({
          error: "Error: Could not add course",
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

// Delete Course from our server and state
export const deleteCourse = (admin, name) => {
  // Del data from server
  // code below requires server call
  // filters out the Tag we don't want.
  const url = `/api/course/${name}`;

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
        // filters out the Course we don't want.
        const filteredCourses = admin.state.courses.filter((course) => {
          return course.code !== name;
        });
        admin.setState({
          courses: filteredCourses,
        });
      } else {
        // If server couldn't delete the image, tell the user.
        // Here we are adding a generic message, but you could be more specific in your app.
      }
    })
    .catch((error) => {
      console.log(error);
    });

  // we need to also remove related entry in our database
  // we need to also remove reviews about this courses
  // the above should be done to our database
};

// Add Tag to our server and state
export const addNewTag = (form, adminComp, tagsCard, tagName) => {
  const url = "/api/tag";
  // The data we are going to send in our request
  const tagData = new FormData(form);

  // Create our request constructor with all the parameters we need
  const request = new Request(url, {
    method: "post",
    body: tagData,
  });

  // Send the request with fetch()
  fetch(request)
    .then(function (res) {
      // Handle response we get from the API.
      // Usually check the error codes to see what happened.
      if (res.status === 200) {
        tagsCard.setState({ newTag: "" });
        const tagList = adminComp.state.tags;
        tagList.push({ name: tagName, usedIn: [] });
        adminComp.setState({
          tags: tagList,
        });
      } else {
        adminComp.setState({
          error: "Error: Could not add course",
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

// Delete Tag from our server and state
export const deleteTag = (admin, name) => {
  // Del data from server
  // code below requires server call
  // filters out the Tag we don't want.
  const url = `/api/tag/${name}`;

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
        const filteredTags = admin.state.tags.filter((tag) => {
          return tag.name !== name;
        });
        admin.setState({
          tags: filteredTags,
        });
      } else {
        // If server couldn't delete the image, tell the user.
        // Here we are adding a generic message, but you could be more specific in your app.
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
