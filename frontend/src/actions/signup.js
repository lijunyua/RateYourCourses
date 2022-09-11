export const signUp = (SignUp, App) => {
	const url = "/api/users"

	const user = {username: SignUp.state.Username,
				  password: SignUp.state.Password, 
				  permission: "user", 
				  year: 1,
				  coursesTaken: [],
				  preferredTags: [],
				  review: []}

	const request = new Request(url, {
		method: "post",
		body: JSON.stringify(user),
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json"
		}
	})

	fetch(request)
		.then(res => {
			if (res.status === 200) {
				App.setState({
					user: SignUp.state.Username,
					permission: "user",
					login: true
				})
			} else {
				alert("Sorry, this Username has been taken")
			}
		})
		.catch(error => {
			console.log(error)
		});
}

export const handleSignUp = (SignUp, App) => {
    // Check if password and confirm password matches
    if (SignUp.state.Password !== SignUp.state.ConfirmPassword) {
		alert("Password and Confirm Password do not match")
		return null
    }
    if (SignUp.state.Username.length < 3) {
		alert("Please use an username with at least 3 characters")
		return null
    }
    if (SignUp.state.Password.length < 4) {
    	alert("Please use a password with at least 4 characters")
    	return null
    }
    // Send server request and check if username exists
    signUp(SignUp, App)
    // if no success and send to login page
    
  }

export const signUpToLogin = (App) => {
	App.setState({
		user: null,
		permission: null,
		login: true
	})
}

export const handleInputChange = (SignUp, event) => {
	const target = event.target;
    const value = target.value;
    const name = target.name;

    SignUp.setState({
      [name]: value,
    });
}