<template>
	<v-container>
		<v-row>
			<v-col cols="4"></v-col>
			<v-col cols="4"><p class="display-2 text-center">NERTZ</p></v-col>
			<v-col cols="4"><Rules :game="this.gameTitle" /></v-col>
		</v-row>
		<v-row>
			<v-col>
				<v-form @submit.prevent="newGame" :disabled="submitDisabled">
					<v-text-field v-model="gameName" label="Game Name"></v-text-field>
					<v-btn type="submit" color="primary" :disabled="submitDisabled">Start a New Game</v-btn>
				</v-form>
			</v-col>
		</v-row>
		<Error :error="error" v-if="error" class="mb-6"></Error>
		<v-row v-if="userId">
			<GamesList :gameTitle="this.gameTitle"/>
		</v-row>
	</v-container>
</template>

<script>
import firestore from '../../firebase';
import GamesList from '../../components/GamesList';
import Rules from '../../components/Rules';
import Error from '../../components/Error';
import firebase from 'firebase/app';
import 'firebase/firestore'

export default {
	name: 'NertzGames.vue',
	components: {
		GamesList,
		Rules,
		Error,
	},
	data() {
		return {
			userId: this.$store.state.uid,
			gameTitle: 'Nertz',
			gameName: null,
			defaultPlayers: [
				{
					id: 1,
					name: 'New Player (Click to edit)',
					scores: [],
					newScore: null,
					totalScore: 0,
					editName: false,
				},
				{
					id: 2,
					name: 'New Player 2',
					scores: [],
					newScore: null,
					totalScore: 0,
					editName: false,
				},
			],
			submitDisabled: false,
		}
	},
	computed: {
		nertzCollectionRef() {
			if (this.$store.state.uid) {
				return firestore.collection('users').doc(this.$store.state.uid).collection('nertz') || null;
			}
			return null;
		},
		loggedIn() {
			return !!this.$store.state.uid;
		},
		error() {
			return this.$store.state.error;
		},
	},
	methods: {
		newGame() {
			if (this.loggedIn) {
				if (this.gameName && this.gameName.length > 1) {
					this.submitDisabled = true;
					this.nertzCollectionRef.add({
						created: firebase.firestore.Timestamp.now(),
						updated: firebase.firestore.Timestamp.now(),
						gameId: '',
						gameName: this.gameName,
						gameData: {
							players: this.defaultPlayers,
						},
					})
						.then((docRef) => {
							docRef.update({
								gameId: docRef.id,
							});
							docRef.get().then(game => {
								this.$store.dispatch('setGame', game.data())
							});
							this.$router.push('/nertz/' + docRef.id);
						})
						.catch((err) => {
							console.error('Error adding document: ', err);
							this.submitDisabled = false;
						});
				} else {
					this.$store.dispatch('error', 'You must name give your game a name');
				}
			} else {
				this.$store.dispatch('error', 'You must be logged in to start a new game');
			}
		},
	},
}
</script>
