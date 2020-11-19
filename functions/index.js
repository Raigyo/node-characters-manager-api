// firebase-functions is an npm module that enables you to create functions
const functions = require('firebase-functions');
// firebase-admin is the firebase admin SDK that enables your functions to control
// all of your backend Firebase services
const admin = require('firebase-admin');
// express is the ExpressJS library that lets you create a server instance
const express = require('express');
// cors is an npm module that allows your functions to run somewhere separate from your client.
const cors = require('cors');
// The app.use is just enabling CORS for your express server instance.
const app = express();
app.use(cors({ origin: true }));
/*For our purposes, the app.get is just making an HTTP GET call and capturing the request in req
and response in res. When the endpoint is called, it will return a "Hello World!" string
with a HTTP status code of 200. */
app.get('/hello-world', (req, res) => {
  return res.status(200).send('Hello World!');
});

exports.app = functions.https.onRequest(app);