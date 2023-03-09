import {collection, query, where, getDocs} from "firebase/firestore";
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started
// https://firebase.google.com/docs/web/setup#available-libraries

exports.signUpUser = functions.https.onCall((data, context) => {
  db.collection("Users").add({
    id: data.id,
    email: data.email,
    name: data.name,
    password: data.password,
  });
  return `name: ${data.name}, password: ${data.password}`;
});

exports.addLike = functions.https.onCall((data, context) => {
  db.collection("Likes").add({
    userid: data.userid,
    itemId: data.itemId,
  });
  return `userid: ${data.userid}, cocktailid: ${data.cocktailid}`;
});

exports.removeLike = functions.https.onCall((data, context) => {
  const like = query(collection(db, "Likes"), where("userid", "==", data.userid), where("itemId", "==", data.itemId));
  const likeElm= getDocs(like);

  likeElm.forEach((doc) => {
    return `You got this: ${doc.data()}`;
  });
});

exports.removeLike = functions.https.onCall((data, context) => {
  return "removeLike";
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
    userid: data.userid,
    end_subscribed_date: data.subdate,
  });
  return `userid: ${data.userid}, end_subscribed_date: ${data.subdate}`;
});