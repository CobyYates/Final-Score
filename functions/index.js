const functions = require('firebase-functions');
const admin = require('firebase-admin');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp();

function addUser(userId, email) {
	console.log('setting new user doc:', userId, email);
	return admin
		.firestore()
		.collection('users')
		.doc(userId)
		.set({
			email,
			players: [],
		});
}

exports.createUser = functions.auth.user().onCreate(user => addUser(user.uid, user.email));