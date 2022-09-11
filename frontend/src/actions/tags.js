// get the data we need for all courses
export const getTags = (Comp) => {
  // Get data from server
  // code below requires server call
  const url = "/api/allTags";
  fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get all tags");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            Comp.setState({ tags: json });
        })
        .catch(error => {
            console.log(error);
        });
};
