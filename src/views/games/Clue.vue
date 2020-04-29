<template>
	<v-container>
		<v-row class="pa-4 pl-8 pr-8 mb-md-12">
			<v-col cols="12 d-flex flex-column flex-md-row justify-space-between align-center">
				<div class="titles">
					<h1 class="clue-font">Clue</h1>
					<h2 class="display-1 ml-1">{{ gameName }}</h2>
					<p>{{ gameId }}</p>
				</div>
				<div class="top-buttons mt-4 mt-md-0">
					<Rules :game="this.gameTitle" class="rules mr-md-6" />
					<v-btn tile to="/clue/" class="mt-2 mr-md-4">
						<v-icon class="mr-2" dark>mdi-restore</v-icon>Previous Games
					</v-btn>
				</div>
			</v-col>
		</v-row>

		<v-row class="clue-content pb-12">
			<v-card elevation="4" class="player-card">
				<v-row class="player-card-title">
					<div class="player-info">
						<v-img :src="this.characters[charSelect].image" :alt="'Image of the ' + this.characters[charSelect].name + ' pawn'" width="100px" height="100px" class="player-img">
						</v-img>
						<h2 class="text-center text-md-left pl-4 display-1 font-weight-light">{{ this.name }}</h2>
					</div>
					<div class="player-edit">
						<v-dialog v-model="playerDialog" max-width="600px" @click.stop="playerDialog = true">
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
					<v-tabs fixed-tabs>
						<v-tab><h3>Suspects</h3></v-tab>
						<v-tab><h3>Weapons</h3></v-tab>
						<v-tab><h3>Rooms</h3></v-tab>

						<v-tab-item class="pt-8">
							<div class="suspects">
								<div class="buttons" v-for="suspect in suspects" :key="suspect.i">
									<p>{{ suspect.value }}</p>
									<div class="mb-3 mr-2 button-container">
										<v-btn v-model="suspect.status" 
										class="button-icon"
										:class="suspect.status"
										:color="suspects[suspect.id].bg"
										@click="suspectButtonPress(suspect.id)"><v-icon>{{ suspect.icon }}</v-icon>
										</v-btn>
									</div>
								</div>
							</div>
						</v-tab-item>

						<v-tab-item class="pt-8">
							<div class="weapons">
								<div class="buttons" v-for="weapon in weapons" :key="weapon.i">
									<p>{{ weapon.value }}</p>
									<div class="mb-3 mr-2 button-container">
										<v-btn v-model="weapon.status" 
										class="button-icon"
										:class="weapon.status"
										:color="weapons[weapon.id].bg"
										@click="weaponButtonPress(weapon.id)"><v-icon>{{ weapon.icon }}</v-icon>
										</v-btn>
									</div>
								</div>
							</div>
						</v-tab-item>

						<v-tab-item class="pt-8">
							<div class="rooms">
								<div class="buttons" v-for="room in rooms" :key="room.i">
									<p>{{ room.value }}</p>
									<div class="mb-3 mr-2 button-container">
										<v-btn v-model="room.status" 
										class="button-icon"
										:class="room.status"
										:color="rooms[room.id].bg"
										@click="roomButtonPress(room.id)"><v-icon>{{ room.icon }}</v-icon>
										</v-btn>
									</div>
								</div>
							</div>
						</v-tab-item>
					</v-tabs>
				</v-row>
				<v-row class="d-flex justify-center align-center">
					<v-container>
						<v-btn depressed block x-large class="ma-0 mb-n3" @click="updateFirestore()">
						Submit Responses
						</v-btn>
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
							<template #item.action="props">
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
							</template>
							<template #no-data>
								No Data
							</template>
						</v-data-table>
					</v-card>
				</template>

				<div class="selected pt-12">
					<v-row>
						<div class="selected-section">
							<h3 class="pb-4">Suspects(s) selected:</h3>
							<div 
							v-for="item in suspects"
							:key="item.status">
								<div v-if="item.status === 'yes'">
									<div class="elevation-4 mb-4" color="white">
										<v-img :src="item.image" :alt="'Image of ' + item.value" class="selected-image" />
									</div>
								</div>
								<div v-else></div>
							</div>
						</div>
						<div class="selected-section">
							<h3 class="pb-4">Weapon(s) selected:</h3>
							<div 
							v-for="item in weapons"
							:key="item.status">
								<div v-if="item.status === 'yes'">
									<div class="elevation-4 mb-4" color="white">
										<v-img :src="item.image" :alt="'Image of ' + item.value" class="selected-image" />
									</div>
								</div>
								<div v-else></div>
							</div>
						</div>
						<div class="selected-section">
							<h3 class="pb-4">Room(s) selected:</h3>
							<div 
							v-for="item in rooms"
							:key="item.status">
								<div v-if="item.status === 'yes'">
									<div class="elevation-4 mb-4" color="white">
										<v-img :src="item.image" :alt="'Image of ' + item.value" class="selected-image" />
									</div>
								</div>
								<div v-else></div>
							</div>
						</div>
					</v-row>
				</div>
			</div>
		</v-row>
		<v-row>
			<error :error="error" v-if="error" class="mb-6"></error>
		</v-row>
	</v-container>
</template>

<script>
import firestore from '../../firebase';
import Rules from '../../components/Rules';
import Error from '../../components/Error';
import firebase from 'firebase/app';
import 'firebase/firestore';

export default {
	components: {
		Error,
		Rules,
	},
	data() {
		return {
			userId: this.$store.state.uid,
			gameTitle: 'Clue',
			gameId: this.$route.params.gameId || null,
			gameName: this.$store.state.game.gameName || '',
			gameData: {
				suspects: [],
				weapons: [],
				rooms: [],
				playerName: '',
				colorID: 0,
			},

			playerDialog: false,
			noteDialog: false,
			headers: [
				{ text: 'Note', sortable: false, value: 'note' },
				{ text: 'Actions', align: 'right', sortable: false, value: 'action' },
			],
			notes: [],
			editedIndex: -1,
			editedItem: {
				note: '',
			},
			defaultItem: {
				note: '',
			},
			name: 'Player',
			counter: 0,
			charSelect: 0,
			characters: [
				{
					name: 'Red',
					image: require('../../assets/images/clue/red-player.jpg'),
				},
				{
					name: 'Yellow',
					image: require('../../assets/images/clue/yellow-player.jpg'),
				},
				{
					name: 'Green',
					image: require('../../assets/images/clue/green-player.jpg'),
				},
				{
					name: 'Blue',
					image: require('../../assets/images/clue/blue-player.jpg'),
				},
				{
					name: 'Purple',
					image: require('../../assets/images/clue/purple-player.jpg'),
				},
				{
					name: 'White',
					image: require('../../assets/images/clue/white-player.jpg'),
				},
			],
			weapons: [
				{
					image: require('../../assets/images/clue/knife.jpg'),
					value: 'Knife',
					id: 0,
					icon: 'mdi-help',
					bg: '#eee',
					status: 'maybe',
				},
				{
					image: require('../../assets/images/clue/candlestick.jpg'),
					value: 'Candlestick',
					id: 1,
					icon: 'mdi-help',
					bg: '#eee',
					status: 'maybe',
				},
				{
					image: require('../../assets/images/clue/revolver.jpg'),
					value: 'Revolver',
					id: 2,
					icon: 'mdi-help',
					bg: '#eee',
					status: 'maybe',
				},
				{
					image: require('../../assets/images/clue/rope.jpg'),
					value: 'Rope',
					id: 3,
					icon: 'mdi-help',
					bg: '#eee',
					status: 'maybe',
				},
				{
					image: require('../../assets/images/clue/lead-pipe.jpg'),
					value: 'Lead Pipe',
					id: 4,
					icon: 'mdi-help',
					bg: '#eee',
					status: 'maybe',
				},
				{
					image: require('../../assets/images/clue/wrench.jpg'),
					value: 'Wrench',
					id: 5,
					icon: 'mdi-help',
					bg: '#eee',
					status: 'maybe',
				},
			],
			rooms: [
				{
					image: require('../../assets/images/clue/hall.jpg'),
					value: 'Hall',
					id: 0,
					icon: 'mdi-help',
					bg: '#eee',
					status: 'maybe',
				},
				{
					image: require('../../assets/images/clue/lounge.jpg'),
					value: 'Lounge',
					id: 1,
					icon: 'mdi-help',
					bg: '#eee',
					status: 'maybe',
				},
				{
					image: require('../../assets/images/clue/dining-room.jpg'),
					value: 'Dining Room',
					id: 2,
					icon: 'mdi-help',
					bg: '#eee',
					status: 'maybe',
				},
				{
					image: require('../../assets/images/clue/kitchen.jpg'),
					value: 'Kitchen',
					id: 3,
					icon: 'mdi-help',
					bg: '#eee',
					status: 'maybe',
				},
				{
					image: require('../../assets/images/clue/ballroom.jpg'),
					value: 'Ball Room',
					id: 4,
					icon: 'mdi-help',
					bg: '#eee',
					status: 'maybe',
				},
				{
					image: require('../../assets/images/clue/conservatory.jpg'),
					value: 'Conservatory',
					id: 5,
					icon: 'mdi-help',
					bg: '#eee',
					status: 'maybe',
				},
				{
					image: require('../../assets/images/clue/billiard-room.jpg'),
					value: 'Billiards Room',
					id: 6,
					icon: 'mdi-help',
					bg: '#eee',
					status: 'maybe',
				},
				{
					image: require('../../assets/images/clue/library.jpg'),
					value: 'Library',
					id: 7,
					icon: 'mdi-help',
					bg: '#eee',
					status: 'maybe',
				},
				{
					image: require('../../assets/images/clue/study.jpg'),
					value: 'Study',
					id: 8,
					icon: 'mdi-help',
					bg: '#eee',
					status: 'maybe',
				},
			],
			suspects: [
				{
					image: require('../../assets/images/clue/colonel-mustard.jpg'),
					value: 'Colonel Mustard',
					id: 0,
					icon: 'mdi-help',
					bg: '#eee',
					status: 'maybe',
				},
				{
					image: require('../../assets/images/clue/miss-scarlet.jpg'),
					value: 'Miss Scarlet',
					id: 1,
					icon: 'mdi-help',
					bg: '#eee',
					status: 'maybe',
				},
				{
					image: require('../../assets/images/clue/mr-green.jpg'),
					value: 'Mr. Green',
					id: 2,
					icon: 'mdi-help',
					bg: '#eee',
					status: 'maybe',
				},
				{
					image: require('../../assets/images/clue/mrs-peacock.jpg'),
					value: 'Mrs. Peacock',
					id: 3,
					icon: 'mdi-help',
					bg: '#eee',
					status: 'maybe',
				},
				{
					image: require('../../assets/images/clue/mrs-white.jpg'),
					value: 'Mrs. White',
					id: 4,
					icon: 'mdi-help',
					bg: '#eee',
					status: 'maybe',
				},
				{
					image: require('../../assets/images/clue/professor-plum.jpg'),
					value: 'Professor Plum',
					id: 5,
					icon: 'mdi-help',
					bg: '#eee',
					status: 'maybe',
				},
			],
		}
	},
	computed: {
		formTitle () {
			return this.editedIndex === -1 ? 'New Note' : 'Edit Note'
		},
		clueCollectionRef() {
			if (this.$store.state.uid) {
				return firestore.collection('users').doc(this.$store.state.uid).collection('clue').doc(this.gameId) || null;
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
	watch: {
		noteDialog (val) {
			val || this.close();
		},
	},
	methods: {
		initialize () {
			this.notes = []
		},
		getGame() {
			this.clueCollectionRef.onSnapshot((doc) => {
				this.gameName = doc.data().gameName;
				this.gameData = doc.data().gameData;
				this.name = doc.data().gameData.playerName;
				this.charSelect = doc.data().gameData.colorID;
				console.log('GOT DATA: ' + this.gameData);

				for(let i = 0; i <= this.gameData.suspects.length; i++) {
					let index = this.gameData.suspects[i];
					console.log('SUSPECT INDEX: ' + index);
					this.suspects[index].status = 'yes';
					this.suspects[index].icon = 'mdi-check-bold';
					this.suspects[index].bg = '#9eb579';
				}
				for(let i = 0; i <= this.gameData.weapons.length; i++) {
					let index = this.gameData.weapons[i];
					console.log('SUSPECT INDEX: ' + index);
					this.weapons[index].status = 'yes';
					this.weapons[index].icon = 'mdi-check-bold';
					this.weapons[index].bg = '#9eb579';
				}
				for(let i = 0; i <= this.gameData.rooms.length; i++) {
					let index = this.gameData.rooms[i];
					console.log('SUSPECT INDEX: ' + index);
					this.rooms[index].status = 'yes';
					this.rooms[index].icon = 'mdi-check-bold';
					this.rooms[index].bg = '#9eb579';
				}
			});
		},
		
		updateFirestore() {
			this.clueCollectionRef.update({
				updated: firebase.firestore.Timestamp.now(),
				gameData: {
					suspects: this.gameData.suspects,
					weapons: this.gameData.weapons,
					rooms: this.gameData.rooms,
					playerName: this.name,
					colorID: this.charSelect,
				},
			})
				.then(function() {
					console.log('Firebase successfully Updated Clue Game');
				})
				.catch(function(error) {
					console.error('Error writing to Firebase: ', error);
				});
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
			this.playerName = name;
			this.gameData.colorID = charSelect;
			this.playerDialog = false;
		},
		suspectButtonPress(id) {
			if (this.suspects[id].status === 'maybe') {
				this.suspects[id].status = 'yes';
				this.suspects[id].icon = 'mdi-check-bold';
				this.suspects[id].bg = '#9eb579';

				this.gameData.suspects.push(this.suspects[id].id);
				console.log('Added ' + this.suspects[id].value + ' to gameData array. == ' + this.gameData.suspects);

			} else if (this.suspects[id].status === 'yes') {
				this.suspects[id].status = 'no';
				this.suspects[id].icon = 'mdi-close-thick';
				this.suspects[id].bg = '#bd7373';

				const index = this.gameData.suspects.indexOf(this.suspects[id].id);
				this.gameData.suspects.splice(index, 1);
				console.log('Removed ' + this.suspects[id].value + ' from gameData array. == ' + this.gameData.suspects);

			} else if (this.suspects[id].status === 'no') {
				this.suspects[id].status = 'maybe';
				this.suspects[id].icon = 'mdi-help';
				this.suspects[id].bg = '#eee';
			} else {
				this.suspects[id].status = 'maybe';
			}
		},
		weaponButtonPress(id) {
			if (this.weapons[id].status === 'maybe') {
				this.weapons[id].status = 'yes';
				this.weapons[id].icon = 'mdi-check-bold';
				this.weapons[id].bg = '#9eb579';

				this.gameData.weapons.push(this.weapons[id].id);
				console.log('Added ' + this.weapons[id].value + ' to gameData array. == ' + this.gameData.weapons);

			} else if (this.weapons[id].status === 'yes') {
				this.weapons[id].status = 'no';
				this.weapons[id].icon = 'mdi-close-thick';
				this.weapons[id].bg = '#bd7373';

				const index = this.gameData.weapons.indexOf(this.weapons[id].id);
				this.gameData.weapons.splice(index, 1);
				console.log('Removed ' + this.weapons[id].value + ' from gameData array. == ' + this.gameData.weapons);

			} else if (this.weapons[id].status === 'no') {
				this.weapons[id].status = 'maybe';
				this.weapons[id].icon = 'mdi-help';
				this.weapons[id].bg = '#eee';
			} else {
				this.weapons[id].status = 'maybe';
			}
		},
		roomButtonPress(id) {
			if (this.rooms[id].status === 'maybe') {
				this.rooms[id].status = 'yes';
				this.rooms[id].icon = 'mdi-check-bold';
				this.rooms[id].bg = '#9eb579';

				this.gameData.rooms.push(this.rooms[id].id);
				console.log('Added ' + this.rooms[id].value + ' to gameData array. == ' + this.gameData.rooms);

			} else if (this.rooms[id].status === 'yes') {
				this.rooms[id].status = 'no';
				this.rooms[id].icon = 'mdi-close-thick';
				this.rooms[id].bg = '#bd7373';

				const index = this.gameData.rooms.indexOf(this.rooms[id].id);
				this.gameData.rooms.splice(index, 1);
				console.log('Removed ' + this.rooms[id].value + ' from gameData array. == ' + this.gameData.rooms);

			} else if (this.rooms[id].status === 'no') {
				this.rooms[id].status = 'maybe';
				this.rooms[id].icon = 'mdi-help';
				this.rooms[id].bg = '#eee';
			} else {
				this.rooms[id].status = 'maybe';
			}
		},
	},
	created () {
		this.initialize();
		this.getGame();
	},
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Kanit:400,700,900&display=swap');
.v-btn--active:before {
    background: inherit;
}
.theme--light.v-btn--active:hover::before, .theme--light.v-btn--active::before {
    background: inherit;
}
.v-btn:hover:before {
    opacity: 0.08;
}

.title-area {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}

.top-buttons {
	display: flex;
	flex-direction: column;
	justify-content: center !important;
	align-items: center !important;
}

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
	justify-content: center;
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

.selected-image {
	width: 200px;
	height: 325px;
}

.selected .row {
	display: flex;
	justify-content: space-evenly;
	align-items: flex-start;
	flex-wrap: wrap;
	flex-direction: row;
}

.selected div {
	border-radius: 8px;
}

.selected .selected-section {
	max-width: 200px;
	margin: 10px;
}

.selected .selected-section h3 {
	font-size: 18px;
}

@media only screen and (min-width: 768px) {
	.player-card {
		width: 60%;
	}

	.title-area {
		justify-content: flex-start;
		flex-direction: row;
	}
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

@media only screen and (min-width: 1900px) {
	div.clue-content {
		justify-content: space-evenly;
	}

	.player-card {
		width: 30%;
	}

	.player-card .suspects, .player-card .weapons, .player-card .rooms {
		padding: 0 30px;
	}

	.notes {
		width: 40%;
	}
}
</style>