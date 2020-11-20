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
const path = require('path');

app.use(cors({ origin: true }));
/* For our purposes, the app.get is just making an HTTP GET call and capturing the request in req
and response in res. When the endpoint is called, it will return a "Hello World!" string
with a HTTP status code of 200. */

// app.get('/hello-world', (req, res) => {
//   return res.status(200).send('Hello World!');
// });

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname,'./index.html'));
});

var serviceAccount = require("./permissions.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://character-manager-825d7.firebaseio.com"
});
const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true })

// POST: create
app.post('/api/create', (req, res) => {
  (async () => {
      try {
        await db.collection('items').doc('/' + req.body.id + '/')
            .create({item: req.body.item});
        return res.status(200).send();
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
    })();
});

// READ: read item
app.get('/api/read/:item_id', (req, res) => {
  (async () => {
      try {
          const document = db.collection('items').doc(req.params.item_id);
          let item = await document.get();
          let response = item.data();
          return res.status(200).send(response);
      } catch (error) {
          console.log(error);
          return res.status(500).send(error);
      }
      })();
  });

// READ: read all
app.get('/api/read', (req, res) => {
  (async () => {
      try {
          let query = db.collection('items');
          let response = [];
          await query.get().then(querySnapshot => {
              let docs = querySnapshot.docs;
              for (let doc of docs) {
                  const selectedItem = {
                      id: doc.id,
                      item: doc.data().item
                  };
                  response.push(selectedItem);
              }
              return response;
          });
          return res.status(200).send(response);
      } catch (error) {
          console.log(error);
          return res.status(500).send(error);
      }
      })();
  });

// UPDATE: update
app.put('/api/update/:item_id', (req, res) => {
(async () => {
  try {
      const document = db.collection('items').doc(req.params.item_id);
      await document.update({
          item: req.body.item
      });
      return res.status(200).send();
  } catch (error) {
      console.log(error);
      return res.status(500).send(error);
  }
  })();
});

// DELETE: delete
app.delete('/api/delete/:item_id', (req, res) => {
(async () => {
  try {
      const document = db.collection('items').doc(req.params.item_id);
      await document.delete();
      return res.status(200).send();
  } catch (error) {
      console.log(error);
      return res.status(500).send(error);
  }
  })();
});

exports.app = functions.https.onRequest(app);