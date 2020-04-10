<template>
	<v-container>
		<v-row>
			<v-col>
				<v-form @submit.prevent="newGame">
					<v-text-field v-model="gameName" label="Game Name"></v-text-field>
					<v-btn type="submit" color="primary">Start a New Game</v-btn>
				</v-form>
			</v-col>
		</v-row>
		<v-row>
			<games-list :games="games" :gameType="'nertz'" />
		</v-row>
	</v-container>
</template>

<script>
import firestore from '../../firebase';
import GamesList from '../../components/GamesList';

export default {
	name: 'NertzGames.vue',
	data() {
		return {
			players: [],
			gameName: null,
			defaultPlayers: [
				{
					id: 1,
					name: 'New Player (Click to edit name)',
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
			games: [],
		}
	},
	computed: {
		nertzCollectionRef() {
			return firestore.collection('users').doc(this.$store.state.uid).collection('nertz');
		},

	},
	methods: {
		newGame() {
			this.nertzCollectionRef.add({
				gameId: '',
				gameName: this.gameName,
				players: this.defaultPlayers,
			})
				.then((docRef) => {
					console.log('Document written with ID: ', docRef.id);
					docRef.update({
						gameId: docRef.id,
					});
					this.$router.push('/nertz/' + docRef.id);
				})
				.catch((error) => {
					console.error('Error adding document: ', error);
				});
		},
		getGames() {
			this.nertzCollectionRef.get()
				.then((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						// doc.data() is never undefined for query doc snapshots
						console.log(doc.id, ' => ', doc.data());
						this.games.push(doc.data());
					});
				})
				.catch((err) => {
					console.error('Error getting games:', err);
				});
		},
	},
	components: {
		GamesList,
	},
	created() {
		this.getGames();
	},
}
</script>

<style scoped>

</style>
