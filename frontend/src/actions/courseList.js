// get the data we need for all courses
export const getData = (courseListComp) => {
  // Get data from server
  // code below requires server call
  const url = "/api/allCourses";
  fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get all courses");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            courseListComp.setState({ courses: json});
        })
        .catch(error => {
            console.log(error);
        });
};
