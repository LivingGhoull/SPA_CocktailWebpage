const functions = require("firebase-functions");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", {structuredData: true});
    response.send("Hello from Firebase!");
});




// const express = require('express')
// const app = express()

// app.get('/', (req, res) => {
//     console.log('enterd')
//     res.send('hello world post "/" ')
// })

// app.listen(3000), () => {
//     console.log('server is running')
// }

// exports.app = functions.https.onRequest(app)




