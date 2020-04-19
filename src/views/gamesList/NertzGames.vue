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
		<v-row v-if="userId">
			<GamesList :gameTitle="this.gameTitle"/>
		</v-row>
	</v-container>
</template>

<script>
import firestore from '../../firebase';
import GamesList from '../../components/GamesList';
import Rules from '../../components/Rules';
import firebase from 'firebase/app';
import 'firebase/firestore'

export default {
	name: 'NertzGames.vue',
	components: {
		GamesList,
		Rules,
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
	},
	methods: {
		newGame() {
			if (this.gameName.length > 1) {
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
			}
		},
	},
}
</script>
