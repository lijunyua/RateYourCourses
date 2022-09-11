## team21
Our application is called rate your courses.
Deployed app URL: https://rateyourcourses-team21.herokuapp.com/

## Features
- Sign in/ Sign up
    - A user can sign up for our application and log in using their username and password
- Dashboard
	 - After setting up your prefered tags, you can get your course recommendation here. 
- Write a course review
    - Choose 3 tags and your personal rating, as well as writing a comment for a course.
- Search for a course or tag
	- Search courses with course code or tag.
- All courses
	- A page where users can see all courses that the website has recorded before, they can view general information
- Course page
	- A page where users can view specific information about a course, its reviews and ratings, as well as its prerequisite.
- Profile
    - Users can modify their year of study, change their password, change their preferred tags, courses they have taken and delete reviews written by them.
    
- Admin
    - Admins can manage the website by:
	    - Deleting users
	    - Adding and Deleting courses
	    - Adding and Deleting tags
	    - Deleting reviews
	    
## List of third-party libraries
- Bootstrap 


## Default Login Credentials: 
- User:
	- username: user
	- password: user
- Admin: 
	- username: admin 
	- password: admin
	
## Instructions
### Landing page:
- This is the default page users go to if they are not logged in
- If a user have an account, follow these instructions:
	- Click on the form right below Username to enter the username
	- Click on the form right below Password to enter the password corresponding to that username
	- Click `Login` button to attempt a log in
	- If Success the user will go to the Dashboard Page, else an alert will pop up telling the user what has gone wrong
- If a user does not have an account, follow these instructions instead:
	- Click on `Sign Up` button to go to the Sign Up page
	- If clicked by mistake Click `Login` button in the Sign Up page to go back to the Log in page
	- Click on the form right below Username to enter a new username (needs to be exactly or more than 3 characters)
	- Click on the form right below Password to enter a password corresponding to that username (needs to be exactly or more than 4 characters)
	- Click on the form right below Confirm Password to enter the same password as above
	- If Success the user will directly go to the Dashboard Page, else an alert will pop up telling the user what has gone wrong

### Dashboard
- This is the default page users go to if they are logged in
- Click on `Log out` at the top navbar if the user wish to log out and the application will go back to the Log in page
- If you have not selected any tags that you prefer, the Dashboard will prompt the user to go to `My Profile` page to choose tags, courses taken
- You can view general information about each course that is recommended to you based on what you tags you chose in the profile page

### All Courses
- Click on `All Courses` at the top navbar, you can view a list of all courses that our website offers
- You can view general information about each course, such as: course code, course name, average rating, number of reviews, tags that users have given to it.
- You can click on the `View Detail` button to view detail about that course in its own course page, which will be described below.

### Course
- After clicking `View Detail`, you will be redirected to a course's detail page
- Here you can view: 
	- Course code, course name
	- Average rating
	- Prerequisite 
	- Tags
	- All reviews for this course
- If you have **admin** permission, you can delete reviews, this function will be described in Admin section below.

### Search 
- Put the keyword in the search field and click the `Search` button, you can get a list of course matching with your keyword.
- You can click into these course to see their detail.

### Write Review
- Click on `Write Reviews` at the top navbar, you can write reviews.
- To write a review, you need to choose a course, choose 3 tags, give a rating. You can also leave a comment.  
- Click submit button to submit.


### Profile 
- Click on `My Profile` in the top navbar, you will be redirected to profile page
- Here you  can view your personal information
- Modify and information:
	- First click on `Edit Information` button, now you can enter new information
	- Change Year of Study:
		- You can enter a new year of study, it has to be a **number** and has to be chose from **1 ~ 4**.
	- Change your password:
		- You can change your password by entering the new password in the corresponding input field
	- Change preferred tags:
		- You can choose new preferred tags from the list of all tags
	- Change courses taken:
		- You can change courses taken by choosing from a list of all courses
- Delete personal reviews:
	- At the bottom of your profile pages, you will see a table of all reviews you have written before, you can delete them by click on the `Delete` button next to them.

### Admin
- Sign in using the **admin credential** and now you have the permission of an admin.
- Go to normal profile page
- Click on `Go to admin page` next to your permission status, now your will be redirected to admin page.
- Delete user
	- Simply click on the delete button next to a user's username
- Add tag
	- Click in the `Add Tag` button, then enter the tag name in the input field, click `Add`.
- Delete tag
	- Click the delete button next to a tag that you want to delete.
- Add course
	- Click in the `Add Course` button, then enter the course code and course name in the input field, click `Add`.
- Delete tag
	- Click the delete button next to a course that you want to delete.
- Delete reviews:
	- Go to each course's page, then you can view reviews for that courses, if you are an admin, you will see a `Delete` button on the top right of each review, clicking on that button deletes that review.

## Overview of the routes

### /users/login
- `POST /users/login`: An attempt to log in by a user
	- Body is {username: "example_username", password: "example_password"}

### /users/logout
- `GET /users/logout`: A log out request sent by a user

### /users/check-session
- `GET /users/check-session`: The app checks if a user is logged in right now by cookie when it launches

### /api/users
- `POST /api/users`: An attempt to sign up by a user
	- Body is {username: "example_username", password: "example_password", permission: "user", year: 1, coursesTaken: [], preferredTags: [], review: []}

### /api/allUsers
- `GET /api/allUsers`: Get all users in our database for admin to view

### /api/allTags
- `GET /api/allTags`: Get all tags in our database for admin to view

### /api/filteredTags
- `POST /api/filteredTags`: Dashboard gets Tags preferred by this logged in user by ObjectIds of the Tags
	- (Example) Body is {tagIds: ["5fd2aaa1fcf042fd504058b6", "5fd2aa85fcf042fd504058b5"]}

### /api/allCourses
- `GET /api/allCourses`: Get all courses in our database for admin to view

### /tag
- `POST /tag`: For admin add tag feature, create a new tag. 
	- Body is {name: "something"}


### /course
- `POST /course`: For admin add course feature, create a new tag.
	-  Body is {code: ""something, name: "something"}

### /api/course/:id
- `DELETE /course/:id`: For admin delete course feature, delete a course with given id

### /api/tag/:id
- `DELETE /tag/:id`: For admin delete tag feature, delete a tag with given id

### /api/user/:id
- `DELETE /user/:id`: For admin delete user feature, delete a user with given id

### /review
- `POST /review`: For write review feature, post a new review

### /api/review/:id
- `DELETE /review/:id`: For admin delete review feature, delete a review with given id

### /api/edit/:id/
- `PATCH /api/edit/:id`: For user modify personal information feature, allow user to update their information, id is the user's id in our database
	- Body is {newPwd: "", newYear: "", tags: [], courses: []}

