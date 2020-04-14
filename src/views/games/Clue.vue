<template>
	<v-container>
		<v-row class="pa-4 pl-8 pr-8">
			<v-col cols="12 d-flex flex-column flex-md-row justify-space-between align-center">
				<h1 class="clue-font">Cl<span color="red darken-3">u</span>e</h1>
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

		<template>
		<v-row>
			<v-dialog v-model="dialog" persistent max-width="600px">
			<template v-slot:activator="{ on }">
				<v-container class="pl-12 pr-12 text-center text-md-left">
					<v-btn color="#0D47A1" dark v-on="on"><v-icon class="mr-3">mdi-account-edit-outline</v-icon> Edit Player</v-btn>
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
						<v-col cols="12 col-md-6">
							<v-select
							:items="characters"
							label="Select a Character *"
							v-model="charSelect"
							required
							></v-select>
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
		</v-row>
		</template>

		<v-row>
			<v-container class="pa-4 pt-10 pr-12 pl-12">
				<h2 class="text-center text-md-left display-1 font-weight-light">{{ this.name }}</h2>

				<h3 class="font-weight-light">Playing as... {{ this.character.name }}</h3>
				<v-img :src="this.character.image" :alt="'Image of ' + this.character.name" width="100px" height="100px" position="top">
				</v-img>
			</v-container>
		</v-row>
	</v-container>
</template>

<script>
export default {
	data: () => ({
		dialog: false,
		name: "Player",
		charSelect: "",
		character: {name: "", image: ""},
		characters: ["Colonel Mustard","Professor Plum","Mr. Green","Mrs. Peacock","Miss Scarlet","Mrs. White"],
		blank: "../../src/assets/images/clue/blank.jpg",
		buttonPressed: [true, false, null],
		weapons: [{
			knife: {
				image: "../../src/assets/images/clue/knife.jpg",
				value: "Knife",
				selected: false
			},
			candlestick: {
				image: "../../src/assets/images/clue/candlestick.jpg",
				value: "Candlestick",
				selected: false
			},
			revolver: {
				image: "../../src/assets/images/clue/revolver.jpg",
				value: "Revolver",
				selected: false
			},
			rope: {
				image: "../../src/assets/images/clue/rope.jpg",
				value: "Rope",
				selected: false
			},
			leadPipe: {
				image: "../../src/assets/images/clue/lead-pipe.jpg",
				value: "Lead Pipe",
				selected: false
			},
			wrench: {
				image: "../../src/assets/images/clue/wrench.jpg",
				value: "Wrench",
				selected: false
			}
		}],
		rooms: [{
			hall: {
				image: "../../src/assets/images/clue/hall.jpg",
				value: "Hall",
				selected: false
			},
			lounge: {
				image: "../../src/assets/images/clue/lounge.jpg",
				value: "Lounge",
				selected: false
			},
			diningRoom: {
				image: "../../src/assets/images/clue/dining-room.jpg",
				value: "Dining Room",
				selected: false
			},
			kitchen: {
				image: "../../src/assets/images/clue/kitchen.jpg",
				value: "Kitchen",
				selected: false
			},
			ballroom: {
				image: "../../src/assets/images/clue/ballroom.jpg",
				value: "Ball Room",
				selected: false
			},
			conservatory: {
				image: "../../src/assets/images/clue/conservatory.jpg",
				value: "Conservatory",
				selected: false
			},
			billiardRoom: {
				image: "../../src/assets/images/clue/billiard-room.jpg",
				value: "Billiards Room",
				selected: false
			},
			library: {
				image: "../../src/assets/images/clue/library.jpg",
				value: "Library",
				selected: false
			},
			study: {
				image: "../../src/assets/images/clue/study.jpg",
				value: "Study",
				selected: false
			}
		}],
		suspects: [{
			colonelMustard: {
				image: "../../src/assets/images/clue/colonel-mustard.jpg",
				value: "Colonel Mustard",
				selected: false
			},
			missScarlet: {
				image: "../../src/assets/images/clue/miss-scarlet.jpg",
				value: "Miss Scarlet",
				selected: false
			},
			mrGreen: {
				image: "../../src/assets/images/clue/mr-green.jpg",
				value: "Mr. Green",
				selected: false
			},
			mrsPeacock: {
				image: "../../src/assets/images/clue/mrs-peacock.jpg",
				value: "Mrs. Peacock",
				selected: false
			},
			mrsWhite: {
				image: "../../src/assets/images/clue/mrs-white.jpg",
				value: "Mrs. White",
				selected: false
			},
			profPlum: {
				image: "../../src/assets/images/clue/professor-plum.jpg",
				value: "Professor Plum",
				selected: false
			}
		}]
	}),
	computed: {

	},
	methods: {
		// Need to fix image selection
		editPlayer(name, charSelect) {
			this.name = name;
			this.character.name = charSelect;
			this.character.image = this.blank;
			for(let i = 0; i <= this.characters.length; i++ ){
				this.character.image = this.suspects[i].image;
			}
			this.dialog = false;
		},
		/*
		buttonPress() {
			for(let i = 0; i <= this.buttonPressed.length; i++) {
				if(this.buttonPressed[i] === "Yes") {
					
				}
			}
		}
		*/
	}
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Kanit:900&display=swap');
.clue-font {
	font-family: 'Kanit', sans-serif;
	font-weight: 900;
	text-transform: uppercase;
	font-size: 3rem;
	line-height: 1.5;
	letter-spacing: 1px;
}


@media only screen and (min-width: 768px) {
	
}

@media only screen and (min-width: 1200px) {
	
}
</style>