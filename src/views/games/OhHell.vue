<template>
	<v-container>
		<v-row class="pa-4 pl-8 pr-8">
			<v-col cols="12 d-flex flex-column flex-md-row justify-space-between align-center">
				<h1><span class="font-weight-light">Oh</span> Hell</h1>
				<div class="buttons mt-4 mt-md-0">
					<v-btn
					class="mr-6"
					large
					tile
					href="https://www.pagat.com/exact/ohhell.html"
					target="_blank"
					title="Open Rules in a new tab"
					>
						<v-icon class="mr-3" dark>mdi-book-open-variant</v-icon>Rules
					</v-btn>
					<v-btn large tile to="/history">
						<v-icon class="mr-3" dark>mdi-restore</v-icon>Previous Scores
					</v-btn>
				</div>
			</v-col>
		</v-row>

		<v-row class="pl-8 mt-n2 mt-md-n6">
			<v-col cols="12 d-flex flex-column flex-md-row justify-space-between align-center">
				<v-dialog v-model="playerDialog" max-width="500px">
					<template v-slot:activator="{ on }">
						<div class="d-flex justify-content-center align-center">
							<v-btn large tile v-on="on">
								<v-icon dark class="mr-2">mdi-account-plus-outline</v-icon>Add Player
							</v-btn>
						</div>
					</template>
					<v-card>
						<v-card-title>
							<span class="headline">{{ playerTitle }}</span>
						</v-card-title>
						<v-card-text>
							<v-container>
								<v-row>
									<v-col cols="12">
										<v-text-field v-model="editedItem.name" label="Player Name"></v-text-field>
									</v-col>
								</v-row>
							</v-container>
						</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
							<v-btn color="blue darken-1" text @click="save">Save</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-col>
		</v-row>
		<v-row class="pa-4 pl-11">
			<div class="table">
				<v-data-table :headers="headers" :items="rounds" class="elevation-4">
					<template v-slot:top>
						<v-toolbar flat color="white">
							<v-toolbar-title>{{ editedItem.name }}</v-toolbar-title>
							<v-spacer></v-spacer>
							<v-dialog v-model="dialog" max-width="500px">
								<template v-slot:activator="{ on }">
									<v-btn light class="mr-n2" v-on="on" icon title="Add Round">
										<v-icon dark>mdi-plus-circle-outline</v-icon>
									</v-btn>
								</template>
								<v-card>
									<v-card-title>
									<span class="headline">{{ formTitle }}</span>
									</v-card-title>
									<v-card-text>
										<v-container>
											<v-row>
												<v-col cols="12" sm="6" md="4" lg="3">
													<v-text-field v-model="editedItem.numcards" label="Number Cards"></v-text-field>
												</v-col>
												<v-col cols="12" sm="6" md="4" lg="3">
													<v-text-field v-model="editedItem.bid" label="Round Bid"></v-text-field>
												</v-col>
												<v-col cols="12" sm="6" md="4" lg="3">
													<v-checkbox v-model="editedItem.bidwon" label="Bid Won?"></v-checkbox>
												</v-col>
												<v-col cols="12" sm="6" md="4" lg="3">
													<v-text-field v-model="editedItem.score" label="Round Score"></v-text-field>
												</v-col>
											</v-row>
										</v-container>
									</v-card-text>
									<v-card-actions>
										<v-spacer></v-spacer>
										<v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
										<v-btn color="blue darken-1" text @click="save">Save</v-btn>
									</v-card-actions>
									</v-card>
							</v-dialog>
							<v-btn light icon title="Remove Player">
								<v-icon dark>mdi-account-minus-outline</v-icon>
							</v-btn>
						</v-toolbar>
					</template>
					<template v-slot:item.actions="{ item }">
						<v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
						<v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
					</template>
					<template v-slot:no-data>
						<v-btn color="primary" @click="initialize">Reset</v-btn>
					</template>
				</v-data-table>
			</div>
		</v-row>
	</v-container>
</template>

<script>
export default {
	data: () => ({
		dialog: false,
		playerDialog: false,
		headers: [
			{ text: "Number Cards", align: "start", sortable: false, value: "numcards"},
			{ text: "Bid", value: "bid", sortable: false },
			{ text: "Bid Won?", value: "bidwon", sortable: false },
			{ text: "Score", value: "score", sortable: false },
			{ text: "Actions", value: "actions", sortable: false }
		],
		rounds: [],
		players: [],
		editPlayers: -1,
		editedIndex: -1,
		editedItem: {
			name: "",
			numcards: 1,
			bid: 0,
			bidwon: false,
			score: 0
		},
		defaultItem: {
			name: "Player",
			numcards: 1,
			bid: 0,
			bidwon: false,
			score: 0
		},
		editPlayer: {
			name: ""
		}
	}),

	computed: {
		formTitle() {
			return this.editedIndex === -1 ? "New Round" : "Edit Round";
		},

		playerTitle() {
			return this.editedIndex === -1 ? "New Player" : "Edit Player";
		}

		/*
		numCards() {
			return this.numCards[editedIndex]++;
		}
		*/
	},

	watch: {
		dialog(val) {
			val || this.close();
		},
		playerDialog(val) {
			val || this.close();
		}
	},

	created() {
		this.initialize();
	},

	methods: {
		initialize() {
			(this.rounds = [
				{
					name: "Player",
					numcards: 1,
					bid: 1,
					bidwon: true,
					score: 11
				}
			]),
			(this.players = ["Player"]);
		},

		editItem(item) {
			this.editedIndex = this.rounds.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialog = true;
		},

		deleteItem(item) {
			const index = this.rounds.indexOf(item);
			confirm("Are you sure you want to delete this item?") &&
			this.rounds.splice(index, 1);
		},

		close() {
			this.dialog = false;
			this.playerDialog = false;
			setTimeout(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
				this.editPlayers = -1;
			}, 300);
		},

		save() {
			if (this.editedIndex > -1) {
				Object.assign(this.rounds[this.editedIndex], this.editedItem);
			} else {
				this.rounds.push(this.editedItem);
			}
			this.close();
		},

		savePlayer() {
			if (this.editPlayers > -1) {
				Object.assign(this.players[this.editPlayers], this.editPlayer);
			} else {
				this.players.push(this.editedPlayer);
			}
			this.close();
		}
	}
};
</script>

<style scoped>
.table {
	width: 98%;
	margin: 10px 1%;
}

@media only screen and (min-width: 768px) {
	.table {
		width: 48% !important;
	}
}

@media only screen and (min-width: 1200px) {
	.table {
		width: 31.33% !important;
	}
}
</style>