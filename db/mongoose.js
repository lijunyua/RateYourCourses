const mongoose = require('mongoose');

/* Connnect to our database */
// Get the URI of the local database, or the one specified on deployment.
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://lijunyua:lijunyua@rateyourcoursescluster.yhbldxc.mongodb.net/RateYourCoursesDB?retryWrites=true&w=majority'

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.catch((error) => {
    console.log('Error connecting to mongodb. Timeout reached.', error);
  });

module.exports = { mongoose }  // Export the active connection.