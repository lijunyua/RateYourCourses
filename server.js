/* server.js for react-express-authentication */
"use strict";
const log = console.log;

const express = require("express");
// starting the express server
const app = express();
const path = require("path");

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
// mongoose.set("useFindAndModify", false); // for some deprecation issues

// import the mongoose models
const { User } = require("./models/user");
const { Course } = require("./models/course");
const { Tag } = require("./models/Tag");
const { Review } = require("./models/review");
const { BasicData } = require("./models/basicData");

// to validate object IDs
const { ObjectID } = require("mongodb");

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const multipart = require("connect-multiparty");
const multipartMiddleware = multipart();

// express-session for managing user sessions
const session = require("express-session");
const review = require("./models/review");
const { reset } = require("nodemon");
app.use(bodyParser.urlencoded({ extended: true }));

function isMongoError(error) {
  // checks for first error returned by promise rejection if Mongo database suddently disconnects
  return (
    typeof error === "object" &&
    error !== null &&
    error.name === "MongoNetworkError"
  );
}

async function readBasicData()
{
    try{
        const tmp = await BasicData.find()
        if(tmp.length === 0)
        {
            log("Generating new basic data.")
            const bdata = new BasicData(
                {
                    reviewID: 1
                }
            )
            return await bdata.save()
        }else
        return tmp[0]
    }
    catch(error)
    {
        throw(error)
    }

}

async function getTopTags(course)
{
    try{
    let tmp = {}
    log(course.reviews)
    log(course.reviews.length)
    for(const e of course.reviews)
    {
        const tgs = await Review.find( {_id : e})
        log(tgs)
        for(const t of tgs[0].tags)
        {
            if(!tmp[t])
                tmp[t] = 1
            else
                tmp[t] ++
        }
    }
    log(tmp)
    let mx = [0, 0, 0]
    let ret = [null, null, null]
    let tbf = null
    for(const e of Object.keys(tmp))
    {
        if(tmp[e] > mx[2])
        {
            mx[2] = tmp[e]
            ret[2] = e
        }
        if(mx[2] > mx[1])
        {
            tbf = mx[1]
            mx[1] = mx[2]
            mx[2] = tbf
            tbf = ret[1]
            ret[1] = ret[2]
            ret[2] = tbf
        }
        if(mx[1] > mx[0])
        {
            tbf = mx[0]
            mx[0] = mx[1]
            mx[1] = tbf
            tbf = ret[0]
            ret[0] = ret[1]
            ret[1] = tbf
        }
    }
    return ret.filter(x=>x!=null)
    }
    catch(error)
    {
        throw(error)
    }
}

// middleware for mongo connection error for routes that need it
const mongoChecker = (req, res, next) => {
  // check mongoose connection established.
  if (mongoose.connection.readyState != 1) {
    log("Issue with mongoose connection");
    res.status(500).send("Internal server error");
    return;
  } else {
    next();
  }
};

// Routes > ============================

app.use(
  session({
    secret: "our hardcoded secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
      httpOnly: true,
    },
  })
);

app.use(express.static(path.join(__dirname, "/frontend/build")));
// All routes other than above will go to index.html

// a route to log in a user
app.post("/users/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findByUsernamePassword(username, password)
    .then((user) => {
      req.session.user = user._id;
      req.session.username = user.username;
      req.session.permission = user.permission;
      res.send({ user: user.username, permission: user.permission });
      console.log("log in successful");
    })
    .catch((error) => {
      res.send({ user: undefined, permission: undefined })
    });
});
// a route to log out a user
app.get("/users/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      console.log("log out successful");
      res.send();
    }
  });
});
// a route to check user login session by cookie
app.get("/users/check-session", (req, res) => {
  if (req.session.user) {
    res.send({
      user: req.session.username,
      permission: req.session.permission,
    });
    console.log("check session successful");
  } else {
    console.log("unauthorized check session");
    res.status(401).send();
  }
});
// a route to sign up a user
app.post("/api/users", mongoChecker, async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    permission: req.body.permission,
    year: req.body.year,
    coursesTaken: req.body.coursesTaken,
    preferredTags: req.body.preferredTags,
    review: req.body.review,
  });

  try {
    const newUser = await user.save();
    res.send(newUser);
    console.log("sign up successful");
  } catch (error) {
    if (isMongoError(error)) {
      res.status(500).send("Internal server error");
    } else {
      log(error);
      res.status(400).send("Bad Request");
    }
  }
});

// A route to get list of all users
app.get("/api/allUsers", mongoChecker, (req, res) => {
  User.find()
    .then((users) => {
      if (!users) {
        res.status(404).send("users not found");
        return;
      }
      res.send(users);
    })
    .catch((error) => {
      log(error);
      res.status(500).send("Internal Server Error");
    });
});

// A route to get list of all tags
app.get("/api/allTags", mongoChecker, (req, res) => {
  Tag.find()
    .then((tags) => {
      if (!tags) {
        res.status(404).send("tags not found");
        return;
      }
      res.send(tags);
    })
    .catch((error) => {
      log(error);
      res.status(500).send("Internal Server Error");
    });
});
// A route to get list of some tags using tag objectIds
app.post("/api/filteredTags", mongoChecker, (req, res) => {
  const tagIds = req.body.tagIds
  let tagObjectIds = []
  tagIds.forEach(thisTagId => {
    tagObjectIds.push(mongoose.Types.ObjectId(thisTagId))
  })
  Tag.find({
    '_id': { $in: tagObjectIds}
  }).then((tags) => {
    if (!tags) {
      res.status(404).send("tags not found");
      return;
    }
    res.send(tags);
  }).catch((error) => {
    log(error);
    res.status(500).send("Internal Server Error");
  })
});

// A route to get list of all courses
app.get("/api/allCourses", mongoChecker, (req, res) => {
  Course.find()
    .then((courses) => {
      if (!courses) {
        res.status(404).send("courses not found");
        return;
      }
      res.send(courses);
    })
    .catch((error) => {
      log(error);
      res.status(500).send("Internal Server Error");
    });
});

// A route to get list of all reviews
app.get("/api/allReviews", mongoChecker, (req, res) => {
  Review.find()
    .then((reviews) => {
      if (!reviews) {
        res.status(404).send("reviews not found");
        return;
      }
      res.send(reviews);
    })
    .catch((error) => {
      log(error);
      res.status(500).send("Internal Server Error");
    });
});

// A route to get a course
app.get("/api/course/:id", mongoChecker, (req, res) => {
  const courseId = req.params.id;
  Course.findOne({ code: courseId })
    .then((course) => {
      if (!course) {
        res.status(404).send("course not found");
        return;
      }
      console.log(course);
      res.send(course);
    })
    .catch((error) => {
      log(error);
      res.status(500).send("Internal Server Error");
    });
});

// A route to create new Tag
app.post("/api/tag", mongoChecker, multipartMiddleware, (req, res) => {
  console.log(req.body);

  const tag = new Tag({
    name: req.body.newTag,
  });

  // Save the tag
  tag
    .save()
    .then((tag) => {
      res.send(tag);
    })
    .catch((error) => {
      if (isMongoError(error)) {
        // check for if mongo server suddenly disconnected before this request.
        res.status(500).send("Internal server error");
      } else {
        log(error);
        res.status(400).send(error);
      }
    });
});

// A route to create new course
app.post("/api/course", mongoChecker, multipartMiddleware, (req, res) => {
  // Create a new institution

  const course = new Course({
    code: req.body.newCourseCode,
    name: req.body.newCourseName,
    rating: null,
    reviews: [],
    authors: [],
  });

  // Save the tcourse
  course
    .save()
    .then((course) => {
      res.send(course);
    })
    .catch((error) => {
      if (isMongoError(error)) {
        // check for if mongo server suddenly disconnected before this request.
        res.status(500).send("Internal server error");
      } else {
        log(error);
        res.status(400).send("Bad Request");
      }
    });
});

// A route to delete a Tag
app.delete("/api/tag/:id", mongoChecker, (req, res) => {
  const tagId = req.params.id;
  // Delete the tag
  Tag.findOneAndRemove({ name: tagId })
    .then((tag) => {
      if (!tag) {
        res.status(404).send();
      } else {
        tag.usedIn.map((code) => {
          Course.findOne({ code: code }).then((course) => {
            if (course) {
              const filtered = course.tags.filter((tag) => {
                return tag !== tagId;
              });
              course.tags = filtered;
              course.save().catch((error) => {
                if (isMongoError(error)) {
                  log(
                    "Internal server error removing tag from course:\n",
                    error
                  );
                  res.status(500).send("Internal server error");
                } else {
                  log("Bad request:\n", error);
                  res.status(400).send("Bad Request for user");
                }
              });
            }
          });
        });
        res.send(tag);
      }
    })
    .catch((error) => {
      res.status(500).send(error); // server error, could not delete.
    });
});

// A route to delete a course
app.delete("/api/course/:id", mongoChecker, (req, res) => {
  const courseId = req.params.id;

  // Delete the course
  Course.findOneAndRemove({ code: courseId })
    .then((course) => {
      if (!course) {
        res.status(404).send();
      } else {
        course.reviews.map((review) =>
          Review.findOneAndRemove({ index: review.index })
        );
        course.authors.map((author) =>
          User.findOne({ username: author }).then((user) => {
            if (!user) {
              res.status(404).send();
            } else {
              const filtered = user.coursesTaken.filter((course) => {
                return course !== courseId;
              });
              user.coursesTaken = filtered;
              user
                .save()
                .then()
                .catch((error) => {
                  if (isMongoError(error)) {
                    log(
                      "Internal server error adding notification to user:\n",
                      error
                    );
                    res.status(500).send("Internal server error");
                  } else {
                    log("Bad request:\n", error);
                    res.status(400).send("Bad Request for user");
                  }
                });
            }
          })
        );
        res.send(course);
      }
    })
    .catch((error) => {
      res.status(500).send(error); // server error, could not delete.
    });
});

// A route to get a user
app.get("/api/users/:id", mongoChecker, (req, res) => {
  const userId = req.params.id;
  User.findOne({ username: userId })
    .then((user) => {
      if (!user) {
        res.status(404).send("User not found");
        return;
      }
      console.log("get a user", user);
      res.send(user);
    })
    .catch((error) => {
      log(error);
      res.status(500).send("Internal Server Error");
    });
});

// A route to update a user info
app.patch("/api/users/:id", mongoChecker, multipartMiddleware, (req, res) => {
    const userId = req.params.id;
    console.log(req.body);
    User.findOne({ username: userId })
      .then((user) => {
        if (!user) {
          res.status(404).send("User not exists");
          return;
        }

        if (req.body.newPwd) {
          user.password = req.body.newPwd;
        }
        if (req.body.newYear) {
          user.year = req.body.newYear;
        }

        if (req.body.newTags.constructor === Array) {
          const x = req.body.newTags.filter((item)=> {return item !== ''});
          user.preferredTags = x.map(function (x) {
            if (ObjectID.isValid(x)) {
              return mongoose.Types.ObjectId(x)
            }
            });
        } else if (req.body.newTags !== '') {
          user.preferredTags = mongoose.Types.ObjectId(req.body.newTags);
        } else {
          user.preferredTags = [];
        }

        if (req.body.removedCourses.constructor === Array) {
          const x = req.body.removedCourses.filter((item)=> {return item !== ''});
          user.coursesTaken =  x.map(function (x) {return mongoose.Types.ObjectId(x)});
        } else if (req.body.removedCourses !== '') {
          user.coursesTaken = mongoose.Types.ObjectId(req.body.removedCourses);
        } else {
          user.coursesTaken = [];
        }
        
        user
          .save()
          .then((json) => {console.log(user); res.send(json)})
          .catch((error) => {
            if (isMongoError(error)) {
              log("Internal server error remove review from user:\n", error);
              res.status(500).send("Internal server error");
            } else {
              log("Bad request:\n", error);
              res.status(400).send("Bad Request for user");
            }
          });
      })
      .catch((error) => {
        log(error);
        res.status(500).send("Internal Server Error");
      });
  }
);

// A route to delete a user
app.delete("/api/users/:id", mongoChecker, (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  // Delete the user
  User.findOneAndRemove({ username: userId })
    .then((user) => {
      if (!user) {
        res.status(404).send();
      } else {
        // remove reviews wrote by this user
        if (user.review.length > 0) {
          user.reviews.map((review) => {
            Review.findOneAndRemove({ index: review.index }).then((review) => {
              if (!review) {
                res.status(404).send();
              } else {
                const thisCourse = review.course;
                // remove this review from the course
                Course.findOne({ code: thisCourse }).then((course) => {
                  if (course.reviews.length - 1) {
                    course.rating =
                      (course.rating * course.reviews.length - review.rating) /
                      (course.reviews.length - 1);
                  } else {
                    course.rating = null;
                  }
                  const filtered = course.reviews.filter((review) => {
                    return review.index !== reviewId;
                  });
                  course.reviews = filtered;

                  course.save().catch((error) => {
                    if (isMongoError(error)) {
                      log("Internal server error remove user:\n", error);
                      res.status(500).send("Internal server error");
                    } else {
                      log("Bad request:\n", error);
                      res.status(400).send("Bad Request for user");
                    }
                  });
                });
              }
            });
          });
        }
        res.send(user);
      }
    })
    .catch((error) => {
      res.status(500).send(error); // server error, could not delete.
    });
});

// A route to delete a review
app.delete("/api/review/:id", mongoChecker, async (req, res) => {

      try{
      const reviewId = req.params.id;
      log("Deleteing review with ID:")  
        log(reviewId)
      // Delete the review
      const review = await Review.findOneAndDelete({ index: reviewId })
      if (!review) {
        log("Review not found.")  
        return res.status(404).send();
      } else {
            const thisCourse = review.course
            // remove this review from the course
            const course = await Course.findOne({ name: thisCourse })
            if(!course)
            {
                log("Course not found.")
                 return res.status(400).send("Bad Request: Course not found");
            }
            if (course.reviews.length - 1) {
                course.rating =
                  (course.rating * course.reviews.length - review.rating) /
                  (course.reviews.length - 1);
            } else {
                course.rating = null;
            }

            const filtered = course.reviews.filter((ef) => {
                return ef.toString() != review._id.toString();
            });
            course.reviews = filtered;
            course.tags = await getTopTags(course)
            await course.save()

            const thisUser = review.author;
            // remove this review from the author
            const user = await User.findOne({ username: thisUser })
         
            if (!user) {
                log("User not found")
                return res.status(400).send("Bad Request: User not found");
            }
            const filtered1 = user.review.filter((ef) => {
                return ef.toString() != review._id.toString();
            });
            user.review = filtered1;
            await user.save()
            return res.status(200).send(review)
        }
    }catch(error)
    {
        if (isMongoError(error)) {
          log("Internal server error adding review to course:\n", error);
          return  res.status(500).send("Internal server error");
          
        } else {
          log("Bad request:\n", error);
          return res.status(400).send("Bad Request");
        }
    }
  
});

// A route to add a review
app.post("/review", mongoChecker, async (req, res) => {
  //post a review
  const review = new Review(req.body);
  const thisCourse = review.course;
  console.log("Working on adding a new review...")

    try{
      const course = await Course.findOne({ name: review.course })
      if (!course) {
        console.log("This should be a bad course")
        return res.status(404).send("Course not found");
      }
      const user = await User.findOne({ username: review.author })
        if (!user) {
          console.log("This user doesn't exist.")
        return res.status(404).send("User not found");
        }
        const _date = new Date()
        review.date = _date.toDateString()
        const bdata = await readBasicData()
        review.index = bdata.reviewID ++
        await bdata.save()
        const updedReview = await review.save()
        course.rating = (
        ((course.rating==null?0:course.rating) * course.reviews.length + review.rating) /
        (course.reviews.length + 1));
        course.reviews.push(updedReview);
        if(course.authors.filter(x=>x==user.username).length == 0)
            course.authors.push(user.username)
        user.review.push(updedReview);
        await user.save()
        course.tags = await getTopTags(course)
        await course.save()
        log('Good Review, saved.')  
        return res.status(200).send(updedReview)
    }catch(error){
        if (isMongoError(error)) {
          log("Internal server error adding review to course:\n", error);
          return  res.status(500).send("Internal server error");
          
        } else {
          log("Bad request:\n", error);
          return res.status(400).send("Bad Request for user");
        }
    }
});

app.get("*", (req, res) => {
  // check for page routes that we expect in the frontend to provide correct status code.
  const goodPageRoutes = [
    "/",
    "/signUp",
    "/dashboard",
    "/allCourses",
    "/course/:id",
    "/writeReviews",
    "/profile",
    "/searchResult/:id",
    "/adminPage",
  ];
  if (!goodPageRoutes.includes(req.url)) {
    // if url not in expected page routes, set status to 404.
    res.status(404);
  }

  // send index.html
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"));
});

/*************************************************/
// Express server listening...
const port = process.env.PORT || 3000;
app.listen(port, () => {
  log(`Listening on port ${port}...`);
});
