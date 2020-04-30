<template>
	<v-container>
		<v-row>
			<v-col cols="4"></v-col>
			<v-col cols="4"><p class="display-2 text-center">QWIXX</p></v-col>
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
	name: 'QwixxGames.vue',
	components: {
		GamesList,
		Rules,
		Error,
	},
	data() {
		return {
			userId: this.$store.state.uid,
			gameTitle: 'Qwixx',
			gameName: null,
			defaultGameData:{
				redScore: 0,
				redRow: 0,
				blueScore: 0,
				blueRow:0,
				yellowScore: 0,
				yellowRow:0,
				greenScore: 0,
				greenRow:0,
				lockedRow: 0,
				totalScore: 0,
				penaltyScore:0,

			},
			submitDisabled: false,
		}
	},
	computed: {
		qwixxCollectionRef() {
			if (this.$store.state.uid) {
				return firestore.collection('users').doc(this.$store.state.uid).collection('qwixx') || null;
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
							redScore: this.defaultGameData.redScore,
							redRow: this.defaultGameData.redRow,
							blueScore: this.defaultGameData.blueScore,
							blueRow: this.defaultGameData.blueRow,
							yellowScore: this.defaultGameData.yellowScore,
							yellowRow: this.defaultGameData.yellowRow,
							greenScore: this.defaultGameData.greenScore,
							greenRow: this.defaultGameData.greenRow,
							lockedRow: this.defaultGameData.lockedRow,
							totalScore: this.defaultGameData.totalScore,
							penaltyScore: this.defaultGameData.penaltyScore,
						},
					})
						.then((docRef) => {
							docRef.update({
								gameId: docRef.id,
							});
							docRef.get().then(game => {
								this.$store.dispatch('setGame', game.data())
							});
							this.$router.push('/qwixx/' + docRef.id);
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