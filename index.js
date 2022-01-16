const express = require('express');
const bodyParser = require('body-parser');
const { signUp } = require('./services/signup');
const { signIn } = require('./services/signin');
const { getAllUserData } = require('./services/getAllUsersData');
const { deleteUsersData } = require('./services/deleteUsersData');
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/v1/', (req, res) => {
  res.status(200).send({
    status: 'Success',
    message: "You are now connected to Chetan's Backend.. ",
  });
});

app.post('/v1/signUp', (req, res) => {
  signUp(req.body, (err, result) => {
    if (err) {
      console.log('err : ', err);
      res.status(err.code).send(err.response);
    } else {
      res.status(200).send(result);
    }
  });
});

app.post('/v1/signIn', (req, res) => {
  signIn(req.body, (err, result) => {
    if (err) {
      res.status(err.code).send(err.response);
    } else {
      res.status(200).send(result);
    }
  });
});

app.get('/v1/getAllUsersData', (req, res) => {
  getAllUserData((err, result) => {
    if (err) {
      res.status(err.code).send(err.response);
    } else {
      res.status(200).send(result);
    }
  });
});

app.post('/v1/deleteUserData', (req, res) => {
  deleteUsersData(req.body.phone_numbers, (err, result) => {
    if (err) {
      res.status(err.code).send(err.response);
    } else {
      res.status(200).send(result);
    }
  });
});

app.listen(process.env.PORT, () =>
  console.log(`Hi User, app is running on port : ${process.env.PORT}!`)
);
