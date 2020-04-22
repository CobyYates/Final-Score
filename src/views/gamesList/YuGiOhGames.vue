<template>
	<v-container>
		<v-row>
			<v-col cols="4"></v-col>
			<v-col cols="4"><p class="display-2 text-center">Yu-Gi-Oh!</p></v-col>
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
	name: 'YuGiOhGames.vue',
	components: {
		GamesList,
		Rules,
	},
	data() {
		return {
			userId: this.$store.state.uid,
			gameTitle: 'Yu-Gi-Oh!',
			gameName: null,
			submitDisabled: false,
		}
	},
	computed: {
		yuGiOhCollectionRef() {
			if (this.$store.state.uid) {
				return firestore.collection('users').doc(this.$store.state.uid).collection('yugioh') || null;
			}
			return null;
		},
	},
	methods: {
		newGame() {
			if (this.gameName.length > 1) {
				this.submitDisabled = true;
				this.yuGiOhCollectionRef.add({
					created: firebase.firestore.Timestamp.now(),
					updated: firebase.firestore.Timestamp.now(),
					gameId: '',
					gameName: this.gameName,
					gameData: {
						players: [],
					},
				})
					.then((docRef) => {
						docRef.update({
							gameId: docRef.id,
						});
						docRef.get().then(game => {
							this.$store.dispatch('setGame', game.data())
						});
						this.$router.push('/yugioh/' + docRef.id);
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
