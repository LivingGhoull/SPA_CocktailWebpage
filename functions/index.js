const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started
// https://firebase.google.com/docs/web/setup#available-libraries

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

exports.testText = functions.https.onRequest((request, response) => {
  response.send("This is a test");
});

exports.sayHello = functions.https.onCall((data, context) => {
  const name = data.name;
  return `hello user: ${name}`;
});

exports.signUpUser = functions.https.onCall((data, context) => {
  db.collection("users").add({
    email: data.email,
    name: data.name,
    password: data.password,
  });
  return `name: ${data.name}, password: ${data.password}`;
});

exports.addLike = functions.https.onCall((data, context) => {
  db.collection("Likes").add({
    userid: "",
    cocktailid: "",
  });
  return `userid: "", cocktailid: ""`;
});

exports.addComment = functions.https.onCall((data, context) => {
  db.collection("Comments").add({
    userid: "",
    cocktailid: "",
    comment: "",
    created_date: "",
  });
  return `userid: "", cocktailid: "", comment: "", created_date: ""`;
});

exports.addSubscriber = functions.https.onCall((data, context) => {
  db.collection("Subscribers").add({
    userid: "",
    end_subscribed_date: "",
  });
  return `userid: "", end_subscribed_date: ""`;
  
exports.signIn = functions.https.onCall((data, context) => {
  return `you sign in with email: ${data.email} password: ${data.password}`;
});

exports.signUp = functions.https.onCall((data, context) => {
  return "test";
});