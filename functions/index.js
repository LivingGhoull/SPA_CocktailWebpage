const functions = require("firebase-functions");
import * as firebaseJS from '../src/firebase';

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started


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

exports.signUp = functions.https.onCall((data, context) => {
  return `you sign in with email: username: password: confirmpassword: `
});
  
exports.signIn = functions.https.onCall((data, context) => {
    const name = data.name;
    return `hello user: ${name}`;
});