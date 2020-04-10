import Firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyD_8hv5IjZ4GLH-aVXEeo36CGEcvmF9RA8',
	authDomain: 'final-score-vue-3780.firebaseapp.com',
	databaseURL: 'https://final-score-vue-3780.firebaseio.com',
	projectId: 'final-score-vue-3780',
	storageBucket: 'final-score-vue-3780.appspot.com',
	messagingSenderId: '246538904591',
	appId: '1:246538904591:web:fa4d6d522d30c3315fef7a',
	measurementId: 'G-E15NQ9LLBX',
};
// Initialize Firebase
Firebase.initializeApp(firebaseConfig);
Firebase.analytics();

const firestore = Firebase.firestore();

export { firestore as default };
