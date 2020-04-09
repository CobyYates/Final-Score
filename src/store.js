import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';
import 'firebase/auth'
// import firestore from '../firebase';

Vue.use(Vuex);

// export const store = new Vuex.Store({
export default new Vuex.Store({
	state: {
		uid: '',
		username: null,
		currentGameId: null,
		currentGameName: null,
		loginDisabled: false,
		error: null,
	},
	mutations: {
		initializeStore(state) {
			// Check if the ID exists
			if (localStorage.getItem('store')) {
				// Replace the state object with the stored item
				this.replaceState(
					Object.assign(state, JSON.parse(localStorage.getItem('store'))),
				);
			}
		},
		setUid(state, uid) {
			state.uid = uid;
		},
		setUsername(state, username) {
			state.username = username;
		},
		setGame(state, game) {
			state.currentGameId = game.gameId;
			state.currentGameName = game.gameName;
		},
		disableLogin(state) {
			state.loginDisabled = true;
		},
		enableLogin(state) {
			state.loginDisabled = false;
		},
		error(state, error) {
			state.error = error;
		},
		clearError(state) {
			state.error = null;
		},
	},
	actions: {
		createUser(context, payload) {
			firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
				.then(
					(authData) => {
						authData.user.updateProfile({
							displayName: payload.username,
						}).then(() => {
							context.commit('setUsername', authData.user.displayName);
						}).catch((error) => {
							console.error('updateProfile failed: ', error);
						});
						context.commit('enableLogin');
						context.commit('clearError');
					},
				)
				.catch(
					(error) => {
						console.error('signUp() Error while signing up:', error);
						if (error.code === 'auth/email-already-in-use') {
							context.commit('error', error.message);
						}
						context.commit('enableLogin');
					},
				);
		},
		signIn(context, payload) {
			firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
				.then(() => {
					context.commit('enableLogin');
					context.commit('clearError');
				})
				.catch(
					(error) => {
						console.error('signIn() Error while logging In: ', error);
						if (error.code === 'auth/wrong-password') {
							context.commit('error', 'Incorrect password. Please try again.');
						} else if (error.code === 'auth/user-not-found') {
							context.commit('error', 'No user found with that email. Create a new account instead?');
						}
						context.commit('enableLogin');
					},
				);
		},
		setUid(context, uid) {
			context.commit('setUid', uid);
		},
		setUsername(context, username) {
			context.commit('setUsername', username);
		},
		setGame(context, game) {
			context.commit('setGame', game);
		},
		disableLogin(context) {
			context.commit('disableLogin');
		},
		enableLogin(context) {
			context.commit('enableLogin');
		},
		error(context, errorMessage) {
			context.commit('error', errorMessage);
		},
		clearError(context) {
			context.commit('clearError');
		},
	},
});
