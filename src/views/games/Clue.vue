<template>
	<v-container>
		<v-row class="pa-4 pl-8 pr-8">
			<v-col cols="12 d-flex flex-column flex-md-row justify-space-between align-center">
				<h1 class="clue-font">Clue</h1>
				<div class="buttons mt-4 mt-md-0">
					<v-btn
					class="mr-6"
					large
					tile
					href="https://www.ultraboardgames.com/clue/game-rules.php"
					target="_blank"
					title="Open Rules in a new tab"
					>
						<v-icon class="mr-3" dark>mdi-book-open-variant</v-icon>Rules
					</v-btn>
					<v-btn large tile to="/history">
						<v-icon class="mr-3" dark>mdi-restore</v-icon>Previous Games
					</v-btn>
				</div>
			</v-col>
		</v-row>

		<v-row class="clue-content">
			<v-card elevation="4" class="player-card">
				<v-row class="player-card-title">
					<div class="player-info">
						<v-img :src="this.characters[charSelect].image" :alt="'Image of the ' + this.characters[charSelect].name + ' pawn'" width="100px" height="100px" class="player-img">
						</v-img>
						<h2 class="text-center text-md-left pl-4 display-1 font-weight-light">{{ this.name }}</h2>
					</div>
					<div class="player-edit">
						<v-dialog v-model="dialog" max-width="600px" @click.stop="dialog = true">
							<template v-slot:activator="{ on }">
								<v-container>
									<v-btn color="#0D47A1" dark v-on="on"><v-icon class="mr-sm-3">mdi-account-edit-outline</v-icon><span class="hidden-xs-only">Edit Player</span></v-btn>
								</v-container>
							</template>
							<v-card>
								<v-card-title>
								<span class="headline">Edit Player Details</span>
								</v-card-title>
								<v-card-text>
								<v-container>
									<v-row>
										<v-col cols="12 col-md-6">
											<v-text-field label="Player Name *" v-model="name" required></v-text-field>
										</v-col>
										<v-col cols="12">
											<v-radio-group label="Select your Color *" v-model="charSelect">
												<v-radio
												label="Red"
												color="red darken-3"
												value=0
												>
												</v-radio>
												<v-radio
												label="yellow"
												color="amber lighten-2"
												value=1
												>
												</v-radio>
												<v-radio
												label="green"
												color="green"
												value=2
												>
												</v-radio>
												<v-radio
												label="blue"
												color="blue darken-4"
												value=3
												>
												</v-radio>
												<v-radio
												label="purple"
												color="deep-purple"
												value=4
												>
												</v-radio>
												<v-radio
												label="white"
												color="black"
												value=5
												>
												</v-radio>
											</v-radio-group>
										</v-col>
									</v-row>
								</v-container>
								<small>*indicates required field</small>
								</v-card-text>
								<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
								<v-btn color="blue darken-1" text @click="editPlayer(name, charSelect)">Save</v-btn>
								</v-card-actions>
							</v-card>
						</v-dialog>
					</div>
				</v-row>

				<v-row class="buttons-list">
					<v-container>
						<div class="suspects">
						<h3>Suspects</h3>
						<div class="buttons" v-for="suspect in suspects" :key="suspect">
							<p>{{ suspect.value }}</p>
							<div v-for="num in boxes" :key="num" class="mb-3 mr-2 button-container">
								<v-btn class="button-icon" @click="buttonPress"><v-icon>{{ buttonPressed[counter].icon }}</v-icon></v-btn>
							</div>
						</div>
						</div>
						<div class="weapons">
							<h3>Weapons</h3>
							<div class="buttons" v-for="weapon in weapons" :key="weapon">
								<p>{{ weapon.value }}</p>
								<div v-for="num in boxes" :key="num" class="mb-3 mr-2 button-container">
									<v-btn class="button-icon" @click="buttonPress"><v-icon>{{ buttonPressed[counter].icon }}</v-icon></v-btn>
								</div>
							</div>
						</div>
						<div class="rooms">
							<h3>Rooms</h3>
							<div class="buttons" v-for="room in rooms" :key="room">
								<p>{{ room.value }}</p>
								<div v-for="num in boxes" :key="num" class="mb-3 mr-2 button-container">
									<v-btn class="button-icon" @click="buttonPress"><v-icon>{{ buttonPressed[counter].icon }}</v-icon></v-btn>
								</div>
							</div>
						</div>
					</v-container>
				</v-row>
			</v-card>

			<div class="notes">
				<template>
					<v-card elevation="4">
						<div class="notes-heading">
							<h2 class="headline font-weight-light">My Notes</h2>
							<v-dialog v-model="noteDialog" max-width="500px">
								<template v-slot:activator="{ on }">
								<v-btn color="#0D47A1" dark class="mb-2" v-on="on"><v-icon class="mr-2">mdi-notebook-outline</v-icon>New</v-btn>
								</template>
								<v-card>
								<v-card-title>
									<span class="headline">{{ formTitle }}</span>
								</v-card-title>

								<v-card-text>
									<v-container grid-list-md>
									<v-layout>
										<v-flex cols="12">
										<v-text-field v-model="editedItem.note" label="Note"></v-text-field>
										</v-flex>
									</v-layout>
									</v-container>
								</v-card-text>
								<v-card-actions>
									<v-spacer></v-spacer>
									<v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
									<v-btn color="blue darken-1" text @click="save">Save</v-btn>
								</v-card-actions>
								</v-card>
							</v-dialog>
						</div>
						<v-data-table
						:headers="headers"
						:items="notes"
						>
						<!-- CRUD BUTTONS BROKEN - NEED TO FIX -->
							<template slot="items" slot-scope="props">
								<td>{{ props.item.note }}</td>
								<td class="justify-center layout px-0">
								<v-btn
								small
								class="mr-2"
								@click="editItem(props.item)"
								icon
								>
									<v-icon>mdi-pencil-outline</v-icon>
								</v-btn>
								<v-btn
								small
								@click="deleteItem(props.item)"
								icon
								>
									<v-icon>mdi-trash-can-outline</v-icon>
								</v-btn>
								</td>
							</template>
							<template v-slot:no-data>
								<v-btn color="#eee" @click="initialize">Reset</v-btn>
							</template>
						</v-data-table>
					</v-card>
				</template>
			</div>
		</v-row>
	</v-container>
</template>

<script>
export default {
	data: () => ({
		dialog: false,
		noteDialog: false,
		headers: [
			{ text: "Note", sortable: false, value: "note" },
			{ text: "Actions", align: "right", sortable: false, value: "actions" }
		],
		notes: [],
		editedIndex: -1,
		editedItem: {
			note: ''
		},
		defaultItem: {
			note: ''
		},

		name: "Player",
		counter: 0,
		boxes: 4,
		charSelect: 0,
		characters: [
			{
				name: "Red",
				image: require("../../assets/images/clue/red-player.jpg")
			},
			{
				name: "Yellow",
				image: require("../../assets/images/clue/yellow-player.jpg")
			},
			{
				name: "Green",
				image: require("../../assets/images/clue/green-player.jpg")
			},
			{
				name: "Blue",
				image: require("../../assets/images/clue/blue-player.jpg")
			},
			{
				name: "Purple",
				image: require("../../assets/images/clue/purple-player.jpg")
			},
			{
				name: "White",
				image: require("../../assets/images/clue/white-player.jpg")
			}
		],
		blank: require("../../assets/images/clue/blank.jpg"),
		buttonPressed: [
			{
				value: null,
				icon: "mdi-help"
			},
			{ 
				value: true,
				icon: "mdi-check-bold"
			},
			{
				value: false,
				icon: "mdi-close-thick"
			}
		],
		weapons: [
			{
				image: require("../../assets/images/clue/knife.jpg"),
				value: "Knife",
				selected: false
			},
			{
				image: require("../../assets/images/clue/candlestick.jpg"),
				value: "Candlestick",
				selected: false
			},
			{
				image: require("../../assets/images/clue/revolver.jpg"),
				value: "Revolver",
				selected: false
			},
			{
				image: require("../../assets/images/clue/rope.jpg"),
				value: "Rope",
				selected: false
			},
			{
				image: require("../../assets/images/clue/lead-pipe.jpg"),
				value: "Lead Pipe",
				selected: false
			},
			{
				image: require("../../assets/images/clue/wrench.jpg"),
				value: "Wrench",
				selected: false
			}
		],
		rooms: [
			{
				image: require("../../assets/images/clue/hall.jpg"),
				value: "Hall",
				selected: false
			},
			{
				image: require("../../assets/images/clue/lounge.jpg"),
				value: "Lounge",
				selected: false
			},
			{
				image: require("../../assets/images/clue/dining-room.jpg"),
				value: "Dining Room",
				selected: false
			},
			{
				image: require("../../assets/images/clue/kitchen.jpg"),
				value: "Kitchen",
				selected: false
			},
			{
				image: require("../../assets/images/clue/ballroom.jpg"),
				value: "Ball Room",
				selected: false
			},
			{
				image: require("../../assets/images/clue/conservatory.jpg"),
				value: "Conservatory",
				selected: false
			},
			{
				image: require("../../assets/images/clue/billiard-room.jpg"),
				value: "Billiards Room",
				selected: false
			},
			{
				image: require("../../assets/images/clue/library.jpg"),
				value: "Library",
				selected: false
			},
			{
				image: require("../../assets/images/clue/study.jpg"),
				value: "Study",
				selected: false
			}
		],
		suspects: [
			{
				image: require("../../assets/images/clue/colonel-mustard.jpg"),
				value: "Colonel Mustard",
				selected: false
			},
			{
				image: require("../../assets/images/clue/miss-scarlet.jpg"),
				value: "Miss Scarlet",
				selected: false
			},
			{
				image: require("../../assets/images/clue/mr-green.jpg"),
				value: "Mr. Green",
				selected: false
			},
			{
				image: require("../../assets/images/clue/mrs-peacock.jpg"),
				value: "Mrs. Peacock",
				selected: false
			},
			{
				image: require("../../assets/images/clue/mrs-white.jpg"),
				value: "Mrs. White",
				selected: false
			},
			{
				image: require("../../assets/images/clue/professor-plum.jpg"),
				value: "Professor Plum",
				selected: false
			}
		]
	}),
	computed: {
		formTitle () {
			return this.editedIndex === -1 ? 'New Note' : 'Edit Note'
		}
	},
	watch: {
		noteDialog (val) {
			val || this.close();
		}
	},
	created () {
		this.initialize();
	},
	methods: {
		initialize () {
			this.notes = []
		},
		editItem (item) {
			this.editedIndex = this.notes.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.noteDialog = true;
		},
		deleteItem (item) {
			const index = this.notes.indexOf(item);
			confirm('Are you sure you want to delete this note?') && this.notes.splice(index, 1);
		},
		close () {
			this.noteDialog = false;
			setTimeout(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			}, 300)
		},
		save () {
			if (this.editedIndex > -1) {
				Object.assign(this.notes[this.editedIndex], this.editedItem);
			} else {
				this.notes.push(this.editedItem);
			}
			this.close();
		},


		editPlayer(name, charSelect) {
			this.name = name;
			this.charSelect = charSelect;
			this.dialog = false;
		},
		editNotes(note) {
			this.notes.push(note);
		},
		buttonPress() {

		}
	}
};
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

.player-card {
	width: 95%;
	margin-left: 2.5%;
}

.player-card .player-card-title {
	width: 100%;
	margin: 0;
	padding: 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: row;

	background-color: #eee;
}

.player-card .player-info, .buttons-list .buttons {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}

.player-card .player-edit {
	display: flex;
	justify-content: flex-end;
}

.player-card .player-img {
	border-radius: 100%;
}

.buttons-list {
	padding: 20px 5%;
}

.buttons-list h3 {
	border-bottom: 1px solid #ddd;
	margin: 20px 0;
	padding: 10px 0;

	text-transform: uppercase;
	font-family: 'Kanit', sans-serif;
	font-weight: 700;
	letter-spacing: 1px;
	font-size: 1.5rem;
	color: #555;
}

.buttons-list .buttons {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

div.clue-content {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	flex-wrap: wrap;
	flex-direction: row;
}

.buttons-list p {
	margin: 0;
	margin-top: -10px;
	width: 30%;
}

.buttons-list .button-container {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	margin: 0;
}

.buttons-list .button-container button.button-icon {
	margin: 5px 1.25%;
	color: #aaa;
}

.notes {
	width: 95%;
	margin: 20px 2.5%;
}

.notes-heading {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 15px 20px;

	background-color: #eee;
}

@media only screen and (min-width: 768px) {
	
}

@media only screen and (min-width: 1200px) {
	.player-card {
		width: 50%;
	}

	.notes {
		margin-top: 0;
		width: 40%;
	}
}

@media only screen and (min-width: 1600px) {
	div.clue-content {
		justify-content: space-evenly;
	}

	.player-card {
		width: 40%;
	}

	.notes {
		width: 40%;
	}
}
</style>