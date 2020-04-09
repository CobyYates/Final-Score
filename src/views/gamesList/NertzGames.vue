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
			games: [],
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
			this.nertzCollectionRef.add({
				gameId: '',
				gameName: this.gameName,
				players: this.defaultPlayers,
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
				});
		},
		getGames() {
			this.nertzCollectionRef.get()
				.then((querySnapshot) => {
					querySnapshot.forEach((doc) => {
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
