const getUserDataPromise = (user, Dashboard) => {
  return new Promise((resolve, reject) => {
    const url = `/api/users/${user}`;
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
        resolve(json)
      })
      .catch((error) => {
        console.log(error);
        reject(error)
      });
  }) 
}

const getAllCoursesPromise = (Dashboard) => {
  return new Promise((resolve, reject) => {
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
        resolve(json)
      })
      .catch(error => {
          console.log(error);
          reject(error)
      });
  }) 
}
// get the data we need for all courses
// all users and filter based on tags
const getData = async (user, Dashboard) => {
  try {
    let thisUserModel = await getUserDataPromise(user, Dashboard)
    let allCourses = await getAllCoursesPromise(Dashboard)
    // console.log(thisUserModel)
    // console.log(allCourses)
    const tempDashboardState = {
      thisUser: user,
      allCourses: allCourses,
      thisUserModel: thisUserModel,
      thisUserTags: null
    }
    return tempDashboardState;
  } catch(error) {
    console.log(error)
  }
};

export const setUpUser = async (user, Dashboard) => {
  const tempDashboardState = await getData(user, Dashboard);

  const requestBody = {
    tagIds: tempDashboardState.thisUserModel.preferredTags
  }
  const url = "/api/filteredTags";
  const request = new Request(url, {
    method: "post",
    body: JSON.stringify(requestBody),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    }
  })
  fetch(request)
    .then((res) => {
      if (res.status === 200) {
        // return a promise that resolves with the JSON body
        return res.json();
      } else {
        alert("Could not get user tags");
      }
    })
    .then((json) => {
      const allCourses = tempDashboardState.allCourses
      const thisUserTags = json.map(item => item.name)
      let recommendedCourses = []

      for (let i = 0; i < allCourses.length; i++) {
        for (let j = 0; j < allCourses[i].tags.length; j++) {
          if (thisUserTags.includes(allCourses[i].tags[j])) {
            recommendedCourses.push(allCourses[i])
            break
          }
        }
      }
      if (!recommendedCourses.length) {
        recommendedCourses = null
      }
      Dashboard.setState({
        thisUser: user,
        recommendedCourses: recommendedCourses
      })
    })
    .catch((error) => {
      console.log(error);
    });  
}