<template>
	<v-container>
		<v-card class="mt-8 mb-12 flex">
			<v-banner class="headline font-weight-bold center">Previous Games:</v-banner>
			<v-data-iterator
					:items="games"
					class="elevation-1"
					:options="options"
					:search="search"
			>
				<template v-slot:header>
					<v-toolbar
							class="mb-2"
							dark
							color="blue darken-3"
							flat
							height="auto"
					>
						<v-row>
							<v-col cols="12" md="4">
								<v-text-field
										v-model="search"
										clearable
										flat
										solo-inverted
										hide-details
										prepend-inner-icon="mdi-magnify"
										label="Search"
								></v-text-field>
							</v-col>
							<v-col cols="12" md="8">
								<template>
									<v-row justify="end">
										<v-col cols="7" md="8" lg="6" class="py-0">
											<v-select
													v-model="options.sortBy"
													flat
													dark
													hide-details
													solo-inverted
													:items="keys"
													prepend-inner-icon="mdi-magnify"
													label="Sort by"
											></v-select>
										</v-col>
										<v-col cols="5" md="4" lg="4" class="py-0" align="flex-end">
											<v-btn-toggle
													v-model="options.sortDesc"
													mandatory
											>
												<v-btn
														large
														depressed
														color="blue"
														:value="false"
												>
													<v-icon>mdi-arrow-up</v-icon>
												</v-btn>
												<v-btn
														large
														depressed
														color="blue"
														:value="true"
												>
													<v-icon>mdi-arrow-down</v-icon>
												</v-btn>
											</v-btn-toggle>
										</v-col>
									</v-row>
								</template>
							</v-col>
						</v-row>
					</v-toolbar>
				</template>
				<template v-slot:default="props">
					<v-row>
						<v-col>
							<v-list>
								<v-list-item v-for="game in props.items" :key="game.id" link @click="goToGame(game)">
									<v-list-item-content>
											<v-row>
												<v-col cols="12" md="4" lg="4" class="py-0">
													<v-list-item-title>
														{{game.gameName}}
													</v-list-item-title>
												</v-col>
												<v-col cols="12" md="8" class="py-0">
													<v-row>
														<v-col cols="12" sm="6" class="py-0">
															<v-list-item-subtitle>
																Started: {{game.created.toDate().toLocaleDateString()}} {{game.created.toDate().toLocaleTimeString()}}
															</v-list-item-subtitle>
														</v-col>
														<v-col cols="12" sm="6" class="py-0">
															<v-list-item-subtitle>
																Last Played: {{game.updated.toDate().toLocaleDateString()}} {{game.updated.toDate().toLocaleTimeString()}}
															</v-list-item-subtitle>
														</v-col>
													</v-row>
												</v-col>
											</v-row>
									</v-list-item-content>
									<v-list-item-action>
										<v-btn icon @click.stop="deleteGame(game)">
											<v-icon color="grey lighten-1">mdi-delete</v-icon>
										</v-btn>
									</v-list-item-action>
								</v-list-item>
							</v-list>
						</v-col>
					</v-row>
				</template>
			</v-data-iterator>
		</v-card>
		<v-dialog v-model="deleteDialog" width="800px">
			<v-card>
				<v-card-title class="blue darken-3 white--text">
					Are you sure?
				</v-card-title>
				<v-container>
					<v-row class="mx-2">
						Are you sure you want to delete this game?
					</v-row>
				</v-container>
				<v-card-actions>
					<v-spacer />
					<v-btn color="primary" @click="deleteDialog=false">Cancel</v-btn>
					<v-btn @click="confirmDelete" color="error" class="ml-6">Delete</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-container>
</template>

<script>
import firestore from '../firebase';

export default {
	name: 'GamesList',
	props: [
		'gameTitle',
	],
	data() {
		return {
			headers: [
				{
					text: 'Game Name',
					align: 'left',
					value: 'gameName',
				},
				{
					text: 'Date Started',
					value: 'created',
				},
				{
					text: 'Date Last Played',
					value: 'updated',
				},
			],
			games: [],
			options: {
				sortBy: 'updated',
				sortDesc: true,
			},
			gamesLoading: true,
			search: '',
			filter: {},
			keys: [
				{
					text: 'Name',
					value: 'gameName',
				},
				{
					text: 'Started',
					value: 'created',
				},
				{
					text: 'Last Played',
					value: 'updated',
				},
			],
			deleteDialog: false,
			gameToDelete: null,
		};
	},
	computed: {
		filteredKeys () {
			return this.keys.filter(key => key !== 'Name')
		},
		gamesCollectionRef() {
			if (this.$store.state.uid) {
				return firestore.collection('users').doc(this.$store.state.uid).collection(this.gameTitle.toLowerCase()) || null;
			}
			return null;
		},
	},
	methods: {
		getGames() {
			this.gamesCollectionRef.get()
				.then((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						this.games.push(doc.data());
					});
				})
				.catch((err) => {
					console.error('Error getting games:', err);
				});
		},
		goToGame(game) {
			console.log('goToGame:', game);
			this.$store.dispatch('setGame', game);
			this.$router.push(`/${this.gameTitle}/${game.gameId}`);
		},
		deleteGame(game) {
			this.gameToDelete = game;
			this.deleteDialog = true;
		},
		removeGameFromGamesArray() {
			const gameIndex = this.games.findIndex(game => game.gameId === this.gameToDelete.gameId)
			console.log('gameIndex:', gameIndex);
			this.games.splice(gameIndex, 1);
			this.gameToDelete = null;
			this.deleteDialog = false;
		},
		confirmDelete() {
			this.gamesCollectionRef.doc(this.gameToDelete.gameId).delete()
				.then(() => {
					// this.getGames();
					this.removeGameFromGamesArray();
				})
				.catch((err) => {
					console.error('Error deleting game: ', err);
				});
		},
	},
	created() {
		if (this.$store.state.uid) {
			this.getGames();
		} else {
			// this.$router.push('/');
		}
	},
	mounted() {
		if (this.games.length > 0) {
			this.gamesLoading = false;
		}
	},
}
</script>

<style scoped>

</style>