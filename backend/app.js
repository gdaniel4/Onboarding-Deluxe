//BEGINNING OF CODE COPIED DIRECTLY FROM EXAMPLE CODE
const express = require("express");
const mongoose = require("mongoose");  // Require mongoose library
//Adding better logging functionality
const morgan = require("morgan");
//In the production systems, we should not hardcode the sensitive data like API Keys, 
//Secret Tokens, etc directly within the codebase (based on the Twelve factor App method). 
// We will pass them as environment variables. This module helps us to load environment variables from a .env file into process.env
//path: 'env.save' was added to config as parameter to get db connection string
require("dotenv").config({path: 'env.save'});   // Require the dotenv
const axios = require("axios");
const cors = require('cors');

const app = express();  //Create new instance

//const cors = require("cors");

// setting up mongoose DB connection
mongoose
  .connect(process.env.MONGO_URL)   // read environment varibale from .env
  .then(() => {
    console.log("Database connection Success!");
  })
  .catch((err) => {
    console.error("Mongo Connection Error", err);
  });

const PORT = process.env.PORT || 3000; //Declare the port number

app.use(cors());
app.use(express.json()); //allows us to access request body as req.body
app.use(morgan("dev"));  //enable incoming request logging in dev mode

const activitiesRouter = require('./routes/activities.js')
app.use('/activities', activitiesRouter)
const clientsRouter = require('./routes/clients.js')
app.use('/clients', clientsRouter)
const contactsRouter = require('./routes/contacts.js')
app.use('/contacts', contactsRouter)
const educationsRouter = require('./routes/educations.js')
app.use('/educations', educationsRouter)
const employmentsRouter = require('./routes/employments.js')
app.use('/employments', employmentsRouter)
const eventsRouter = require('./routes/events.js')
app.use('/events', eventsRouter)
const familiesRouter = require('./routes/families.js')
app.use('/families', familiesRouter)
const governmentHelpRouter = require('./routes/governmentHelp.js')
app.use('/governmentHelp', governmentHelpRouter)
const healthRouter = require('./routes/healths.js')
app.use('/healths', healthRouter)
const incomesRouter = require('./routes/incomes.js')
app.use('/incomes', incomesRouter)
//const intakesRouter = require('./routes/intakes')
//app.use('/intakes', intakesRouter)
const orgsRouter = require('./routes/orgs.js')
app.use('/orgs', orgsRouter)
const residencesRouter = require('./routes/residences.js')
app.use('/residences', residencesRouter)
const workersRouter = require('./routes/workers.js')
app.use('/workers', workersRouter)
const countersRouter = require('./routes/counters.js')
app.use('/counters', countersRouter)
//add the counter one if needed


//test endpoint
app.get('/', (req, res) => {
  res.send('Hello!!');
});

//https://www.w3schools.com/jsref/jsref_concat_string.asp
//Concat is super useful
//endpoint that will fetch data from an external API
app.get("/promise/:firstName/:lastName/:phone", (req, res) => {
  let firstname = req.params.firstName;//requests the first name, last and phone
  let lastname = req.params.lastName;
  let phoneNum = req.params.phone;
  let part1 = firstname.concat("/", lastname);//concat function adds the second parameter to the first "/"
  let part2 = part1.concat("/", phoneNum);
  let apiURL = 'https://cis-4339.herokuapp.com/api/v1/data/';//url of external api 
  let newURL = apiURL.concat(part2); //adds all the uniquely identifying info to url for external api

 
	axios.get(newURL)
		.then(response => {
			res.status(200).json(response.data);
		})
		.catch((err) => {
			res.status(500).json({ message: err });
		});
});


//ALSO COPIED FROM CLASS FILE
app.listen(PORT, () => {
    console.log("Server started listening on port : ", PORT);
  });
  
  // error handler
  app.use(function (err, req, res, next) {
      console.error(err.message);
      if (!err.statusCode) 
          err.statusCode = 500;
      res.status(err.statusCode).send(err.message);
  });
