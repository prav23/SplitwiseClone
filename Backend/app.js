//import the require dependencies
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');
var apiRoutes = require('./api');

// require('./config/sequelize');

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use('/api', apiRoutes);

//use cors to allow cross origin resource sharing
// app.use(cors({ origin: 'http://localhost:3000', credentials: true }));


//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

// Setup an express server and define port to listen all incoming requests for this application
const setUpExpress = () => {
  
  const port = process.env.APP_PORT || 3001;

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
};

setUpExpress();