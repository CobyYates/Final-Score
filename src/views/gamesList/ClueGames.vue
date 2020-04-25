<template>
	<v-container>
		<v-row class="pa-4 pl-8 pr-8 mb-md-12">
			<v-col cols="12 d-flex flex-column flex-md-row justify-space-between align-center">
				<div>
					<h1 class="clue-font">Clue</h1>
					<v-form @submit.prevent="newGame" :disabled="submitDisabled" class="d-flex align-center">
						<v-text-field v-model="gameName" label="Game Name"></v-text-field>
						<v-btn tile type="submit" class="ml-sm-8" :disabled="submitDisabled"><v-icon class="mr-2" dark >mdi-autorenew</v-icon>
						New Game
						</v-btn>
					</v-form>
				</div>
				<div class="top-buttons mt-4 mt-md-0">
					<Rules :game="this.gameTitle" class="rules mr-md-6" />
					<v-btn tile @click="newGame" class="mt-2 mr-md-4">
						<v-icon class="mr-2" dark>mdi-restore</v-icon>Previous Games
					</v-btn>
				</div>
			</v-col>
		</v-row>
		<Error :error="error" v-if="error" class="mb-6"></Error>
		<v-row v-if="userId">
			<v-container>
				<GamesList :gameTitle="this.gameTitle"/>
			</v-container>
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
	name: 'ClueGames.vue',
	components: {
		GamesList,
		Rules,
		Error,
	},
	data() {
		return {
			userId: this.$store.state.uid,
			gameTitle: 'Clue',
			gameName: null,
			defaultGameData: {
				suspects: [''],
				weapons: [''],
				rooms: [''],
				playerName: '',
				colorID: 0,
			},
			submitDisabled: false,
		}
	},
	computed: {
		clueCollectionRef() {
			if (this.$store.state.uid) {
				return firestore.collection('users').doc(this.$store.state.uid).collection('clue') || null;
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
					this.clueCollectionRef.add({
						created: firebase.firestore.Timestamp.now(),
						updated: firebase.firestore.Timestamp.now(),
						gameId: '',
						gameName: this.gameName,
						gameData: {
							suspects: this.defaultGameData.suspects,
							weapons: this.defaultGameData.weapons,
							rooms: this.defaultGameData.rooms,
							playerName: this.defaultGameData.playerName,
							colorID: this.defaultGameData.colorID,
						},
					})
						.then((docRef) => {
							docRef.update({
								gameId: docRef.id,
							});
							docRef.get().then(game => {
								this.$store.dispatch('setGame', game.data())
							});
							this.$router.push('/clue/' + docRef.id);
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

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Kanit:400,700,900&display=swap');

.clue-font {
	font-family: 'Kanit', sans-serif;
	font-weight: 900;
	text-transform: uppercase;
	font-size: 3rem;
	line-height: 1.5;
	letter-spacing: 1px;
}

.top-buttons {
	display: flex;
	flex-direction: column;
	justify-content: center !important;
	align-items: center !important;
}
</style>
