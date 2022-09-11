export const checkLoginByCookie = (App) => {
	const url = "/users/check-session"
	fetch(url)
		.then(res => {
			if (res.status === 200) {
				return res.json();
			}
		})
		.then(json => {
			if (json && json.user) {
				App.setState({
					user: json.user,
					permission: json.permission,
					login: true
				})
			}
		})
}

export const login = (Login, App) => {
	const loginState = {username: Login.state.Username, password: Login.state.Password}

	const request = new Request("/users/login", {
		method: "post",
		body: JSON.stringify(loginState),
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json"
		}
	})

	fetch(request)
		.then(res => {
			if (res.status === 200) {
				return res.json();
			}
		})
		.then(json => {
			if (json.user !== undefined) {
				App.setState({
					user: json.user,
					permission: json.permission,
					login: true
				})
			} else {
				alert("Invalid Username Password Combination")
			}
		})
		.catch(error => {
			console.log(error)
		})
}

export const logout = (App) => {
	const url = "/users/logout";

	fetch(url)
		.then(res => {
			App.setState({
					user: null,
					permission: null,
					login: true
				})
		})
		.catch(error => {
			console.log(error)
		})
}

export const loginToSignUp = (App) => {
	App.setState({
		user: null,
		permission: null,
		login: false
	})
}

export const handleInputChange = (Login, event) => {
	const target = event.target;
    const value = target.value;
    const name = target.name;

    Login.setState({
      [name]: value,
    });
}